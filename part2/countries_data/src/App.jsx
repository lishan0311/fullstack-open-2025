import { useState,useEffect } from "react"
import axios from 'axios'


const App = (props) => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setCountry] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect (() => {
    console.log('effect')
    if (searchCountry === '') return
    axios
      .get(('https://studies.cs.helsinki.fi/restcountries/api/all'))
      .then(response => setCountries(response.data))
  }, [searchCountry])

  const filtered = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  )

  useEffect (() => {
    if (filtered.length !== 1) return

    const country = filtered[0]
    const lat = country.latlng[0]
    const lon = country.latlng[1]

    const apiKey = import.meta.env.VITE_SOME_KEY

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => setWeather(response.data))
  }, [filtered])

  return (
    <div>
      <p>find countries <input value={searchCountry} onChange={(e)=>setCountry(e.target.value)}/> </p>

      {filtered.length > 10 && <p>Too many matches, specify another filter</p>}

      {filtered.length <= 10 && filtered.length > 1 && 
        filtered.map(country => <p key={country.name.common}>{country.name.common}
          <button onClick={() => setCountry(country.name.common)}>show</button></p>)}

      {filtered.length === 1 && weather &&
        <div>
          <h2>{filtered[0].name.common}</h2>
          <p>capital {filtered[0].capital}</p>
          <p>area {filtered[0].area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.values(filtered[0].languages).map (lang => 
              <li key={lang}>{lang}</li>
            )}
          </ul>
          
          <img src={filtered[0].flags.png} alt="flag" width="150" />

          <h2>Weather in {filtered[0].name.common}</h2>
          <p>Temperature {weather.main.temp} Kelvin </p>
          <img src= {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
        }
    </div>
  )
}


export default App
