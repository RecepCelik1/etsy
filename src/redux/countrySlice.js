import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  country : {value: 'US', label: 'US dollar', flag: '🇺🇸'},
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    countryFunc: (state, action) => {
      state.country = action.payload
    },

  },
})


export const { countryFunc } = countrySlice.actions

export default countrySlice.reducer