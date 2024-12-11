import './Main.css'
import WeatherCard from "../WeatherCard/WeatherCard.jsx"
import ItemCard from "../ItemCard/ItemCard.jsx"
import { useContext } from 'react'
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
                        <ItemCard key={item._id} name={item.name} onCardLike={props.onCardLike}
                         link={item.imageUrl} weatherType={item.weather} handleCardClick={props.handleCardClick} 
                         id={item._id} owner={item.owner} isLiked={item.likes.includes(item.owner)
                        }/>
                    )
                })
            }
            </ul>
        </>
    )
}

export default Main;
