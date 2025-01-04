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
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { RegisterModal } from '../RegisterModal/RegisterModal.jsx';
import { LoginModal } from '../LoginModal/LoginModal.jsx';
import Auth from '../../utils/auth.js';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal.jsx';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';

const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});
const clothingAPI = new ClothingAPI("http://localhost:3001");
const authAPI = new Auth("http://localhost:3001");

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
		.then(() => {
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
	const handleCardClick = (name, image, weather, id, owner) => {
		console.log(name, image, weather, id, owner)
		setActiveModal((
			<ItemModal name={name} image={image} weather={weather} id={id} handleCloseButtonClick={closeActiveModal} handleDeleteCard={handleDeleteCard} owner={owner}></ItemModal>
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
		if (evt.key == 'Escape') {
			closeActiveModal();
		}
	}

	const closeActiveModal = () => {
		setActiveModal(null);
	}

	//functions for AddItemModal
	const handleAddItemSubmit = (newItem) => {
		const token = localStorage.getItem("jwt");
		newItem._id = Math.random();
		
		clothingAPI.addClothing(newItem, token).then((item) => {
			setUserClothing([item, ...userClothing]);
			closeActiveModal();
		})
		.catch(rej => {
			console.error(rej);
		})
	}

	const handleDeleteCard = (id) => {
		const deleteCard = () => {
			const token = localStorage.getItem("jwt");

			clothingAPI.removeClothing(id, token).then(() => {
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

		setActiveModal(
			<ConfirmDeleteModal 
			onConfirm={deleteCard}
			onCancel={() => {
				setActiveModal(null);
			}}
		/>)

		
	}

	const handleCardLike = ({ id, isLiked }) => {
		const token = localStorage.getItem("jwt");
			// Check if this card is not currently liked
		!isLiked 
			? clothingAPI.addCardLike(id, token)
				.then((updatedCard) => {
					setUserClothing((cards) =>
						cards.map((item) => (item._id === id ? updatedCard : item))
					);
				}).catch((err) => console.log(err))
			: clothingAPI.removeCardLike(id, token) 
				.then((updatedCard) => {
					setUserClothing((cards) =>
						cards.map((item) => (item._id === id ? updatedCard : item))
					);
				}).catch((err) => console.log(err));
	}

	//validation
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const handleUserRegistration = (name, avatar, email, password) => {
		authAPI.signUp(name, avatar, email, password).then(() => {
			setActiveModal(null);
			return authAPI.signIn(email, password);
		}).then((data) => {
			localStorage.setItem("jwt", data.token);
			setIsLoggedIn(true);
			setCurrentUser(data);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const handleProfileChange = () => {
		const updateProfile = ({name, avatar}) => {
			const token = localStorage.getItem("jwt");
			authAPI.updateUserProfile(name, avatar, token).then(() => {
				setCurrentUser({ ...currentUser, name: name, avatar: avatar});
				setActiveModal(null);
			})
			.catch((err) => {
				console.log(err);
			})
		}

		setActiveModal(<EditProfileModal onSubmit={updateProfile} handleCloseButtonClick={() => {
			setActiveModal(null);
		}}/>)
	}

	const openSignUpModal = () => {
		setActiveModal(<RegisterModal 
			handleRegistration={handleUserRegistration} 
			handleCloseButtonClick={() => {
				setActiveModal(null);
			}}
			handleToggleClick={() => {
				openLogInModal();
			}
		}></RegisterModal>)
	}
	
	const handleUserAuthorization = (email, password) => {
		return authAPI.signIn(email, password).then((data) => {
			setActiveModal(null);
			localStorage.setItem("jwt", data.token);
			return authAPI.checkTokenValidity(data.token);
		}).then((data) => {
			console.log(data);
			setIsLoggedIn(true);
			setCurrentUser(data);
		})
	} 

	const openLogInModal = () => {
		setActiveModal(<LoginModal 
			handleAuthorization={handleUserAuthorization} 
			handleCloseButtonClick={() => {
				setActiveModal(null);
			}}
			handleToggleClick={() => {
				openSignUpModal();
			}}
		/>)
	}

	const handleLogOut = () => {
		localStorage.removeItem("jwt");
		setIsLoggedIn(false);
		setCurrentUser(null);
	}

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		
		if (token) {
			authAPI.checkTokenValidity(token).then((data) => {
				setIsLoggedIn(true);
				setCurrentUser(data);
			});
		}
	}, [])

	//merge the route and the protected route component together...?
	return (
	<div className='app'>
		<CurrentUserContext.Provider value={currentUser}>
		<TemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
			<Header date={currentDate} location={location} handleAddClothesClick={handleAddClothesClick} 
			handleSignUpClick={openSignUpModal} handleLogInClick={openLogInModal} isLoggedIn={isLoggedIn}
			/>
			<UserClothingContext.Provider value={{userClothing, handleAddItemSubmit}}>
				<Routes>
					<Route path='/' element={
					<Main temperature={temperature} isNight={isNight} weather={weather} ambience={ambience} 
					handleCardClick={handleCardClick} onCardLike={handleCardLike} isLoggedIn={isLoggedIn}/>
					}/>
					<Route path='/profile' element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<Profile
							onCardLike={handleCardLike}
							handleAddClothesClick={handleAddClothesClick} 
							handleCardClick={handleCardClick}
							handleProfileChange={handleProfileChange}
							handleLogOut={handleLogOut}/>
						</ProtectedRoute>
					}/>
				</Routes>
			</UserClothingContext.Provider>
			<Footer/>
			<Overlay handleOverlayClick={handleOverlayClick} handleEscPress={handleEscPress}>
				{activeModal}
			</Overlay>
		</TemperatureUnitContext.Provider>
		</CurrentUserContext.Provider>
	</div>
	);
}

export default App;
