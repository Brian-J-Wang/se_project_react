import WeatherCard from "../WeatherCard/WeatherCard"
import ItemCard from "../ItemCard/ItemCard"

function Main(props) {
    return (
        <>
            <WeatherCard isNight={true} temperature={props.temperature} weather='clear'></WeatherCard>
            <p className="main__blurb">Today is {props.temperature} ° F / You may want to wear:</p>
        </>
    )
}

export default Main;
