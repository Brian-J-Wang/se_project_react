import { useState } from 'react'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherAPI from '../../utils/weatherAPI';
import ClothingAPI from '../../utils/clothingAPI.js';
import Overlay from '../Overlay/Overlay';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import { TemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { UserClothingContext } from '../../contexts/UserClothingContext.js';
import defaultClothingItems from '../../utils/defaultClothing.js'
import Profile from '../Profile/Profile';

const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});
const clothingAPI = new ClothingAPI("http://localhost:3001");

function App() {
	const [temperature, setTemperature] = useState(undefined);
	const [weather, setWeather] = useState(undefined);
	const [currentDate, setDate] = useState(undefined);
	const [location, setLocation] = useState('Earth');
	const [isNight, setIsNight] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [ambience, setAmbience] = useState('cold');
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
	const [userClothing, setUserClothing] = useState([]);

	//get clothing
	useEffect(() => {
		clothingAPI.getClothing()
		.then(res => {
			setUserClothing(res);
		})
		.catch(rej => {
			console.error(rej);
		})
	}, []);

	//get weather data
	useEffect(() => {
		weatherAPI.getWeatherData()
		.then(res => {
			setTemperature(weatherAPI.temperature.F);
			setWeather(weatherAPI.weather);
			setLocation(weatherAPI.location);
			setIsNight(weatherAPI.isNight);
			setAmbience(weatherAPI.ambience);
		})
		.catch(rej => {
			console.error(rej);
		});    
	}, []);

	//get date
	useEffect(() => {
		const currentDate = new Date().toLocaleString('default', {
			month: 'long',
			day: 'numeric'
		});

		setDate(currentDate);
	}, [])

	//opens AddItemModal when the + Add new buttons has been clicked.
	const handleAddClothesClick = () => {
		setActiveModal(<AddItemModal handleCloseButtonClick={closeActiveModal} onAddItem={handleAddItemSubmit}/>);
	}

	//opens ItemModal whenever a clothing card has been clicked.
	const handleCardClick = (name, image, weather, id) => {
	setActiveModal((
		<ItemModal name={name} image={image} weather={weather} id={id} handleCloseButtonClick={closeActiveModal} handleDeleteCard={handleDeleteCard}></ItemModal>
	));
	}

	const handleToggleSwitchChange = () => {
	if (currentTemperatureUnit === 'F') {
		setCurrentTemperatureUnit('C');
		setTemperature(weatherAPI.temperature.C);
	} else {
		setCurrentTemperatureUnit('F');
		setTemperature(weatherAPI.temperature.F);
	}
	}

	//overlay functions
	const handleOverlayClick = (evt) => {
		if (evt.target.classList.contains('overlay')) {
			console.log(evt.currentTarget);
			console.log(evt.target);
			closeActiveModal();
		}
	}

	const handleEscPress = (evt) => {
		if (evt.key == 'Escape') {
			closeActiveModal();
		}
	}

	const closeActiveModal = () => {
		setActiveModal(null);
	}

	//functions for AddItemModal
	const handleAddItemSubmit = (newItem) => {
		newItem._id = Math.random();
		
		clothingAPI.addClothing(newItem).then((item) => {
			setUserClothing([item, ...userClothing]);
			closeActiveModal();
		})
		.catch(rej => {
			console.error(rej);
		})
	}

	const handleDeleteCard = (id) => {
		clothingAPI.removeClothing(id).then((item) => {
			setUserClothing(userClothing.filter((item) => {
				if (item._id != id) {
					return true;
				} else {
					return false;
				}
			}));
			closeActiveModal();
		})
		.catch(rej => {
			console.error(rej);
		})
	}


	return (
	<div className='app'>
		<TemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
			<Header date={currentDate} location={location} handleAddClothesClick={handleAddClothesClick} />
			<UserClothingContext.Provider value={{userClothing, handleAddItemSubmit}}>
				<Routes>
					<Route path='/' element={
					<Main temperature={temperature} isNight={isNight} weather={weather} ambience={ambience} handleCardClick={handleCardClick} />
					}/>
					<Route path='/profile' element={
					<Profile handleAddClothesClick={handleAddClothesClick} handleCardClick={handleCardClick}/>
					}/>
				</Routes>
			</UserClothingContext.Provider>
			<Footer/>

			<Overlay handleOverlayClick={handleOverlayClick} handleEscPress={handleEscPress}>
				{activeModal}
			</Overlay>
		</TemperatureUnitContext.Provider>
	</div>
	);
}

export default App;
