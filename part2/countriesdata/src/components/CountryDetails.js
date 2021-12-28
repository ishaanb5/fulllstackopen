import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  /* 
  defined get request and state to store the obtained results in the child component 
  instead of parent(or app) to reduce the number of calls made to the weather api. A call
  is made only when show button is clicked or when the search resultsnarrows down to a 
  single country.
  */
  const [weatherData, setWeatherData] = useState(false)
  useEffect(() => {
    axios
      .get(
        //env file containing the key has not been checked in.
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      )
      .then((response) => setWeatherData(response.data))
  }, [])

  let languages = Object.getOwnPropertyNames(country.languages)
    .map((lang) => country.languages[lang])
    .map((lang) => <li key={lang}>{lang}</li>)

  return !weatherData ? (
    <p>loading...please wait</p>
  ) : (
    <div>
      <h1>{country.name.common}</h1>
      <p>{`capital ${country.capital.join(', ')}`}</p>
      <p>{`population ${country.population}`}</p>

      <h2>languages</h2>
      <ul>{languages}</ul>

      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />

      <h2>Weather in {country.capital[0]}</h2>
      <dl>
        <dt>
          <strong>temperature: </strong>
        </dt>
        <dd>{weatherData.main.temp} Celsius</dd>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
        <dt>
          <strong>wind:</strong>
        </dt>
        <dd>
          {weatherData.wind.speed} mph {weatherData.wind.deg} degree
        </dd>
      </dl>
    </div>
  )
}

export default CountryDetails
