import { connect } from 'react-redux'
import { updateFilter } from './filterSlice'

const Filter = ({ updateFilter }) => {
  const handleChange = (e) => {
    updateFilter(e.target.value)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <label htmlFor="filter">filter</label>
      <input id="filter" onChange={handleChange} />
    </div>
  )
}

export default connect(null, { updateFilter })(Filter)
