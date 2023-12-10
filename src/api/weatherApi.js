import axios from "axios";
const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const fetchWeather = async(key) =>{
    const response = await axios.get(URL, {
        params: {
            q: key,
            units: 'metric',
            appid: API_KEY
        }
    })
    return response
}

export default fetchWeather