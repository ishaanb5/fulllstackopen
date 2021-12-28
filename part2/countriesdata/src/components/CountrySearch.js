import React from 'react'

const CountrySearch = (props) => {
  return (
    <label>
      find countries
      <input
        type='text'
        value={props.searchText}
        onChange={props.handleSearch}
      />
    </label>
  )
}

export default CountrySearch
