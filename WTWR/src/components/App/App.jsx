import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherAPI from '../../utils/weatherAPI';
import Overlay from '../Overlay/Overlay';
import ItemModal from '../ItemModal/ItemModal';

function App() {
  const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});

  const [temperature, setTemperature] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [currentDate, setDate] = useState(undefined);
  const [location, setLocation] = useState('Earth');
  const [isNight, setIsNight] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  //get weather data
  useEffect(() => {
    weatherAPI.GetWeatherData()
    .then(res => {
      setTemperature(weatherAPI.temperature);
      setWeather(weatherAPI.weather);
      setLocation(weatherAPI.location);
      setIsNight(weatherAPI.isNight);
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


  const handleCardClick = (name, image, weather) => {
    setActiveModal((
      <ItemModal name={name} image={image} weather={weather} handleCloseButtonClick={closeActiveModal} handleEscClick={handleEscClick}></ItemModal>
    ))
  }

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('overlay')) {
      closeActiveModal();
    }
  }

  const handleEscClick = (evt) => {
    if (evt.key == 'Esc') {
      closeActiveModal();
    }
  }

  const closeActiveModal = () => {
    setActiveModal(null);
  }

  //

  return (
    <div className='app'>
      <Header date={currentDate} location={location}></Header>
      <Main temperature={temperature} isNight={isNight} weather={weather} handleCardClick={handleCardClick}></Main>
      <Footer></Footer>
      <Overlay handleOverlayClick={handleOverlayClick}>
        {activeModal}
      </Overlay>
    </div>
  );
}

export default App
