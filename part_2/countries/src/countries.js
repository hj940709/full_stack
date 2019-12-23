import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
    return (
        <div>
            {props.countries.map(country => <p key={country.cioc} >{country.name} 
            <button onClick={()=>{props.setFilter(country.name)}}> show </button></p>) }
        </div>
    )
}

const Country = (props) => {
    const [weather, setWeather] = useState({})
    const API_KEY='API_KEY'
    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${props.country.capital}`)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setWeather(response.data.current)
          })
      }, [])
    return (
        <div>
            <h2>{props.country.name}</h2>
            <p>Capital: {props.country.capital}</p>
            <p>Population: {props.country.population}</p>
            <h3>Languages</h3>
            <ul>
                {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={props.country.flag} />
            <h3>Weather in {props.country.capital}</h3>
            <p><strong>Temperature: </strong> {weather.temperature} Celsius </p>
            <img src={weather.weather_icons}/>
            <p><strong>Wind: </strong> {weather.wind_speed} kpl direction {weather.wind_dir}</p>
        </div>
    )
}

const CountryDisplay = (props) => {
    const countries = props.countries
    if(countries.length>10)
        return (
            <p>Too many matches, specify another filter</p>
        )
    else if (countries.length>1)
        return (
            <Countries countries={countries} setFilter={props.setFilter} />
        )
    else if (countries.length==1)
        return (
            <Country country={countries[0]} />
        )
    else
        return (
            <div></div>
        )
}



export default CountryDisplay