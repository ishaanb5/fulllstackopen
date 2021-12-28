import React from 'react'
import CountrySearchListItem from './CountrySearchListItem'

const CountrySearchList = ({ results }) => {
  return (
    <div>
      {results.map((country) => (
        <CountrySearchListItem key={country.cca3} country={country} />
      ))}
    </div>
  )
}

export default CountrySearchList
