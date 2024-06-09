import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherAPI from '../../utils/weatherAPI';

function App() {
  const weatherAPI = new WeatherAPI('a58fbd8675267b1b73e3c1bdcc74ac04', {longitude: -74.00, latitude: 40.71});

  const [temperature, setTemperature] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [currentDate, setDate] = useState(undefined);
  const [location, setLocation] = useState('Earth');
  const [isNight, setIsNight] = useState(false);

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

  return (
    <div className='app'>
      <Header date={currentDate} location={location}></Header>
      <Main temperature={temperature} isNight={isNight} weather={weather}></Main>
      <Footer></Footer>
    </div>
  );
}

export default App
