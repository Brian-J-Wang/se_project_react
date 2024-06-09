import './Main.css'
import WeatherCard from "../WeatherCard/WeatherCard"
import ItemCard from "../ItemCard/ItemCard"
import defaultClothingItems from '../../utils/defaultClothing.js'


function Main(props) {
    return (
        <>
            <WeatherCard isNight={props.isNight} temperature={props.temperature} weather={props.weather}></WeatherCard>
            <p className="main__blurb">
                Today is {props.temperature} ° F / You may want to wear:
            </p>
            <ul className="main__card-list">
            {
                defaultClothingItems.map(item => {

                    return (
                        <ItemCard key={item._id} name={item.name} link={item.link}></ItemCard>
                    )
                    
                })
            }
            </ul>
        </>
    )
}

export default Main;
