import './WeatherCard.css'

function WeatherCard(props) {
    const weatherType = `weather-card__weather_${props.isNight ? 'night' : 'day'}-${props.weather}`

    //TODO: find a better method to load weather cards other than declaring the background url in the css file
    return (
        <div className={`weather-card ${weatherType}`}>                             
            <p className="weather-card__temperature">{props.temperature + "°F"}</p>
        </div>
    )
}

export default WeatherCard;