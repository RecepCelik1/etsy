import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  soldPrice: 0,
  cost : 0,
  shippingCharge : 0,
  shipping : 0,
}

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    priceFunc: (state, action) => {
      state.soldPrice = action.payload
    },
    costFunc: (state, action) => {
      state.cost = action.payload
    },
    shippingChargeFunc: (state, action) => {
      state.shippingCharge = action.payload
    },
    shippingFunc: (state, action) => {
      state.shipping = action.payload
    },
    priceReset: (state) => initialState,
  },
})


export const { priceFunc , costFunc , shippingChargeFunc , shippingFunc , priceReset} = priceSlice.actions

export default priceSlice.reducer