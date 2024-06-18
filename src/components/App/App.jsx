import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherAPI from '../../utils/weatherAPI';
import Overlay from '../Overlay/Overlay';
import ItemModal from '../ItemModal/ItemModal';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});

function App() {
  const [temperature, setTemperature] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [currentDate, setDate] = useState(undefined);
  const [location, setLocation] = useState('Earth');
  const [isNight, setIsNight] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [ambience, setAmbience] = useState('cold');

  //get weather data
  useEffect(() => {
    weatherAPI.getWeatherData()
    .then(res => {
      setTemperature(weatherAPI.temperature);
      setWeather(weatherAPI.weather);
      setLocation(weatherAPI.location);
      setIsNight(weatherAPI.isNight);
      setAmbience(weatherAPI.ambience);
    })
    .catch(rej => {
      console.log(rej);
    });    
  }, [])

  //get date
  useEffect(() => {
    const currentDate = new Date().toLocaleString('default', {
      month: 'long',
      day: 'numeric'
    });

    setDate(currentDate);
  }, [])

  //functions for opening the form modals
  const handleAddClothesClick = () => {
    setActiveModal((
      <ModalWithForm title='New garment' name="new garment" buttonText="Add garment" form='addClothes'
      handleCloseButtonClick={closeActiveModal} handleEscPress={handleEscPress}>
      </ModalWithForm>
    ))
  }

  //functions for opening the card modal.
  const handleCardClick = (name, image, weather) => {
    setActiveModal((
      <ItemModal name={name} image={image} weather={weather} handleCloseButtonClick={closeActiveModal} handleEscPress={handleEscPress}></ItemModal>
    ))
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

  //

  return (
    <div className='app'>
      <Header date={currentDate} location={location} handleAddClothesClick={handleAddClothesClick}></Header>
      <Main temperature={temperature} isNight={isNight} weather={weather} ambience={ambience} handleCardClick={handleCardClick}></Main>
      <Footer></Footer>
      <Overlay handleOverlayClick={handleOverlayClick}>
        {activeModal}
      </Overlay>
    </div>
  );
}

export default App
