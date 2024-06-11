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

function App() {
  const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});

  const [temperature, setTemperature] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [currentDate, setDate] = useState(undefined);
  const [location, setLocation] = useState('Earth');
  const [isNight, setIsNight] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [ambience, setAmbience] = useState('cold');

  //get weather data
  useEffect(() => {
    weatherAPI.GetWeatherData()
    .then(res => {
      setTemperature(weatherAPI.temperature);
      setWeather(weatherAPI.weather);
      setLocation(weatherAPI.location);
      setIsNight(weatherAPI.isNight);
      setAmbience(weatherAPI.ambience);
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
      <ModalWithForm title='New garment' name="new garment" buttonText="Add garment"
      handleCloseButtonClick={closeActiveModal} handleEscPress={handleEscPress}>
          <label htmlFor="name" className='form-modal__label'>Name</label>
          <input type="text" name="name" id="name" placeholder='Name' className='form-modal__input'/>
          <label htmlFor="image" className='form-modal__label'>Image</label>
          <input type="text" name="image" id="image" placeholder='Image URL' className='form-modal__input'/>
          <h2 className='form-modal__field-header'>Select the weather type</h2>
          <div className="form-modal__radio-selection">
            <label htmlFor="hot" className='form-modal__radio-element'>
              <input type="radio" name="weather-type" id="hot" className='form-modal__radio-button'/> Hot
            </label>
            <label htmlFor="warm" className='form-modal__radio-element'>
              <input type="radio" name="weather-type" id="warm" className='form-modal__radio-button'/> Warm
            </label>
            <label htmlFor="cold" className='form-modal__radio-element'>
              <input type="radio" name="weather-type" id="cold" className='form-modal__radio-button'/> Cold
            </label>
          </div>
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
