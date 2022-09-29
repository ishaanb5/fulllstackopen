import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter(state, action) {
      return action.payload.trim().toLowerCase()
    },
  },
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer
