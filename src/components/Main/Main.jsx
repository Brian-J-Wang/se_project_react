import './Main.css'
import WeatherCard from "../WeatherCard/WeatherCard.jsx"
import ItemCard from "../ItemCard/ItemCard.jsx"
import { useContext, useEffect } from 'react'
import { TemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.js'
import { UserClothingContext } from '../../contexts/UserClothingContext.js'


function Main(props) {
    const temperatureContext = useContext(TemperatureUnitContext);
    const clothingContext = useContext(UserClothingContext);

    return (
        <>
            <WeatherCard isNight={props.isNight} temperature={props.temperature} weather={props.weather}></WeatherCard>
            <p className="main__blurb">
                Today is {props.temperature} ° {temperatureContext.currentTemperatureUnit} / You may want to wear:
            </p>
            <ul className="main__card-list">
            {
                clothingContext.userClothing.filter(item => {
                    if (item.weather == props.ambience) {
                        return true;
                    } else {
                        return false;
                    }
                }).map(item => {
                    return (
                        <ItemCard key={item._id} name={item.name} link={item.imageUrl} weatherType={item.weather} handleCardClick={props.handleCardClick} id={item._id}/>
                    )
                })
            }
            </ul>
        </>
    )
}

export default Main;
