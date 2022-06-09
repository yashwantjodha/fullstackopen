import { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ city }) => {
    const [ tempData, setTempData ] = useState({})
		const KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
					.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`)
					.then(({ data }) => {
						setTempData({
							temperature: data.main.temp,
							wind: data.wind.speed,
							icon: data.weather[0].icon
						})
					})
    })

    // data not fetched
    if (tempData === {}) {
        return <p>weather data loading</p>
    } else {
    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>temperate {tempData.temperature} Celcius</p>
            {
							tempData.icon ? <img src={`http://openweathermap.org/img/wn/${tempData.icon}@2x.png`} alt="weather"/> : ''
						}
            <p>wind {tempData.wind} m/s</p>
        </div>
    )
		}
}

export default Weather