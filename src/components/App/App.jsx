import { act, useState } from 'react'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherAPI from '../../utils/weatherAPI';
import Overlay from '../Overlay/Overlay';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import { TemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { UserClothingContext } from '../../contexts/UserClothingContext.js';
import defaultClothingItems from '../../utils/defaultClothing.js'
import Profile from '../Profile/Profile';

const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});

function App() {
	const [temperature, setTemperature] = useState(undefined);
	const [weather, setWeather] = useState(undefined);
	const [currentDate, setDate] = useState(undefined);
	const [location, setLocation] = useState('Earth');
	const [isNight, setIsNight] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [ambience, setAmbience] = useState('cold');
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
	const [userClothing, setUserClothing] = useState(defaultClothingItems);

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
			console.log(rej);
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

	//load the correct modal
	useEffect(() => {

	}, [activeModal])

	//functions for opening the form modals
	const handleAddClothesClick = () => {
		setActiveModal(<AddItemModal handleCloseButtonClick={closeActiveModal} onAddItem={handleAddItemSubmit} onCloseModal={onCloseModal}/>);
	}

	//functions for opening the card modal.
	const handleCardClick = (name, image, weather) => {
	setActiveModal((
		<ItemModal name={name} image={image} weather={weather} handleCloseButtonClick={closeActiveModal} handleEscPress={handleEscPress}></ItemModal>
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
		closeActiveModal();
	}
	}

	const handleEscPress = (evt) => {
	console.log(evt.key);
	if (evt.key == 'Escape') {
		closeActiveModal();
	}
	}

	const closeActiveModal = () => {
		setActiveModal(null);
	}

	//functions for AddItemModal
	const handleAddItemSubmit = (newItem) => {
		newItem._id = Object.keys(userClothing).length;

		console.log(newItem);

		setUserClothing([newItem, ...userClothing]);
	}

	const onCloseModal = () => {

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
					<Profile handleAddClothesClick={handleAddClothesClick}/>
					}/>
				</Routes>
			</UserClothingContext.Provider>
			<Footer></Footer>

			<Overlay handleOverlayClick={handleOverlayClick}>
				{activeModal}
			</Overlay>
		</TemperatureUnitContext.Provider>
	</div>
	);
}

export default App;
