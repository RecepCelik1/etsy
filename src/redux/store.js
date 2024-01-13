import { configureStore } from '@reduxjs/toolkit'
import priceSlice from './priceSlice'
import countrySlice from './countrySlice'
import toggleSlice from './toggleSlice'
import getCurrency  from './currencyApiSlice'

export const store = configureStore({
  reducer: {
    price : priceSlice,
    country : countrySlice,
    toggle : toggleSlice,
    currency : getCurrency
  },
})