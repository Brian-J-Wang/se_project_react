import './Main.css'
import WeatherCard from "../WeatherCard/WeatherCard.jsx"
import ItemCard from "../ItemCard/ItemCard.jsx"
import defaultClothingItems from '../../utils/defaultClothing.js'
import { useContext } from 'react'
import { TemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.js'


function Main(props) {
    const temperatureContext = useContext(TemperatureUnitContext);

    return (
        <>
            <WeatherCard isNight={props.isNight} temperature={props.temperature} weather={props.weather}></WeatherCard>
            <p className="main__blurb">
                Today is {props.temperature} ° {temperatureContext.currentTemperatureUnit} / You may want to wear:
            </p>
            <ul className="main__card-list">
            {
                defaultClothingItems.filter(item => {
                    if (item.weather == props.ambience) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(item => {
                    return (
                        <ItemCard key={item._id} name={item.name} link={item.link} weatherType={item.weather} handleCardClick={props.handleCardClick}/>
                    )
                })
            }
            </ul>
        </>
    )
}

export default Main;
