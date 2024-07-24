export default class WeatherAPI {
    constructor(apiKey, {longitude, latitude}) {
        this._apiKey = apiKey;
        this._lon = longitude;
        this._lat = latitude;
    }

    getWeatherData() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this._lat}&lon=${this._lon}&appid=${this._apiKey}&units=imperial`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('invalid data')
            }
        })
        .then(json => {
            this.location = json.name;
            this.temperature = {
                'F': 0,
                'C': 0
            };
            this.temperature.F = Math.trunc(json.main.temp);
            this.temperature.C = Math.round((this.temperature.F - 32) * 5/9);
            this.weather = this._calculateWeather(json.weather[0].id);
            this.isNight = this._calculateNight(json.dt, json.sys.sunrise, json.sys.sunset);
            this.ambience = this._calculateWeatherAmbience(this.temperature.F);
        })
    }

    //id system and return is coupled with the class names for the background image in WeatherCard.css.
    _calculateWeather(id) {
        if (id >= 200 && id <=232) {
            return 'storm';
        }

        if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            return 'rain';
        }

        if (id >= 600 && id <= 622) {
            return 'snow';
        }

        if (id >=701 && id <=781) {
            return 'fog';
        }

        if (id == 800) {
            return 'clear';
        }

        if (id >= 801 && id <= 804) {
            return 'cloudy';
        }
    }

    //parameters are given in unix UTC
    _calculateNight(dt, sunrise, sunset) {
        return (dt < sunrise || dt > sunset) ? true : false;
    }

    _calculateWeatherAmbience(temperature) {
        if (temperature >= 86) {
            return 'hot';
          } else if (temperature >= 66 && temperature <= 85) {
            return 'warm';
          } else if (temperature <= 65) {
            return 'cold';
          }
    }
}