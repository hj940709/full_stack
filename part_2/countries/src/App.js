import React, { useState, useEffect } from 'react'
import Filter from './filter'
import CountryDisplay from './countries'
import axios from 'axios'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries] = useState([]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <CountryDisplay countries={countries.filter(country => country.name.includes(filter))} setFilter={setFilter} />
    </div>
  )
}

export default App;
