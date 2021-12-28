import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const CountrySearchListItem = ({ country }) => {
  /* 
  created state inside the child component instead of parent(or app) to avoid 
  re-render of all items in the search list when button is clicked
  */
  const [toggle, setToggle] = useState(false)
  return (
    <div>
      {country.name.common}
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'hide' : 'show'}
      </button>
      {toggle && <CountryDetails country={country} />}
    </div>
  )
}

export default CountrySearchListItem
