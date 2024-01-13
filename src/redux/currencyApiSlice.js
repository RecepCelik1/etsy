import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  currency: [],
}

export const getCurrency = createAsyncThunk('getCurrency', async()=> {
    const {data} = await axios.get('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9UoqgBPnpOUf0ElDEQ7kVOiTQiwqfyV11GpS5lTE')
    return data
})

export const currencySlice = createSlice({
  name: 'currencySlice',
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder.addCase(getCurrency.fulfilled , (state , action) => {
        state.currency = action.payload
    })
  }
})


export default currencySlice.reducer