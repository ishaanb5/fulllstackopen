import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'
import CountrySearch from './components/CountrySearch'
import CountrySearchList from './components/CountrySearchList'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [matchedCountries, setMatchedCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setAllCountries(response.data))
  }, [])

  const handleSearch = (event) => setSearchText(event.target.value)

  useEffect(() => {
    searchText
      ? setMatchedCountries(() => {
          const regex = new RegExp(searchText, 'i')
          return allCountries.filter((country) =>
            regex.test(country.name.common)
          )
        })
      : setMatchedCountries([])
  }, [searchText])

  const result = () => {
    if (matchedCountries.length === 1)
      return <CountryDetails country={matchedCountries[0]} />
    if (matchedCountries.length <= 10)
      return <CountrySearchList results={matchedCountries} />
    if (matchedCountries.length > 10)
      return <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      <CountrySearch handleSearch={handleSearch} searchText={searchText} />
      {result()}
    </div>
  )
}

export default App
