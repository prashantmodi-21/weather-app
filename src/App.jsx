import { useState } from 'react'
import './App.css'
import fetchWeather from './api/weatherApi'
function App() {
  const [city, setCity] = useState()
  const [weather, setWeather] = useState({})

  const fetchApi = async(key)=>{
    if(key === 'Enter'){
      const {data} = await fetchWeather(city)
      setWeather(data)
      setCity('')
    }
  }
  return (
    <>
      <div className='main-container'>
          <input type="text" placeholder='Enter Your City' value={city} className='search' onChange={(e)=> setCity(e.target.value)} onKeyDown={(e) => fetchApi(e.key)}/>
          {weather.main && (<div className='city'>
            <h2 className='city-name'>
              <span className='city-name'>{weather.name}</span>
              <sup className='city-sup'>{weather.sys.country}</sup>
            </h2>
            <div className='city-temp'>
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className='city-icon'>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <span>{weather.weather[0].description}</span>
            </div>
          </div>)}
      </div>
    </>
  )
}

export default App
