import WeatherCard from "../WeatherCard/WeatherCard"
import ItemCard from "../ItemCard/ItemCard"
import './Main.css'

function Main(props) {
    return (
        <>
            <WeatherCard isNight={props.isNight} temperature={props.temperature} weather={props.weather}></WeatherCard>
            <p className="main__blurb">Today is {props.temperature} ° F / You may want to wear:</p>
        </>
    )
}

export default Main;
