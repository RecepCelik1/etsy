import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  differentCurrency : false,
  currencyDifferenceRate : 0,
  internationalSale : false,
  offSiteAds : false,
  underOrOver10kUsd : 0,
  
  
  salesTaxBool : false,
  salesTax : 0,
  otherCostBool : false,
  otherCost : 0,
  
  UkVat : false,
  UkVatRate : 0,
  UkVatInclusive : false,
  VatOnFees : false,
  vatFeeRate : 0,
  ukCostBool : false,
  ukCosts : 0
}

export const toggleSlice = createSlice({
  name: 'toggleSlice',
  initialState,
  reducers: {

    boolToggleFunc: (state , action) => {
        if(action.payload === "isCurrency"){
            state.differentCurrency = !state.differentCurrency
        }
        if(action.payload === "isInternational"){
            state.internationalSale = !state.internationalSale
        }
        if(action.payload === "OffSiteAdds"){
            state.offSiteAds = !state.offSiteAds
        }
        if(action.payload === "isTax"){
            state.salesTaxBool = !state.salesTaxBool
        }
        if(action.payload === "isCost"){
            state.otherCostBool = !state.otherCostBool
        }
        if(action.payload === "UkVat"){
            state.UkVat = !state.UkVat
        }
        if(action.payload === "UkVatInclusive"){
            state.UkVatInclusive = !state.UkVatInclusive
        }
        if(action.payload === "VatOnFees"){
            state.VatOnFees = !state.VatOnFees
        }
        if(action.payload === "ukCostBool"){
            state.ukCostBool = !state.ukCostBool
        }

        if(state.offSiteAds === false){
          state.underOrOver10kUsd = 0
        }
        if(state.salesTaxBool === false){
          state.salesTax = 0
        }
        if(state.otherCostBool === false){
          state.otherCost = 0
        }
        if(state.UkVat === false){
          state.UkVatRate = 0
        }
        if(state.VatOnFees === false){
          state.vatFeeRate = 0
        }
        if(state.ukCostBool === false){
          state.ukCosts = 0
        }
        if(state.differentCurrency === true){
          state.currencyDifferenceRate = 25/10
        } else{
          state.currencyDifferenceRate = 0
        }
    },

    underOrOver10kUsdFunc : (state , action) => {
        state.underOrOver10kUsd = action.payload
        
    },
    salesTaxFunc : (state , action) => {
      if(isNaN(action.payload)){
        state.salesTax = 0
      }else {
        state.salesTax = action.payload
      }  
    },
    otherCostFunc : (state , action) => {
      if(isNaN(action.payload)){
        state.otherCost = 0
      }else {
        state.otherCost = action.payload
      }      
    },
    UkVatRateFunc : (state , action) => {
      if(isNaN(action.payload)){
        state.UkVatRate = 0
      }else {
        state.UkVatRate = action.payload
      }
    },
    FeeVatRateFunc : (state , action) => {
      if(isNaN(action.payload)){
        state.vatFeeRate = 0
      }else {
        state.vatFeeRate = action.payload
      }  
    },
    ukCostsFunc : (state , action) => {
      if(isNaN(action.payload)){
        state.ukCosts = 0
      }else {
        state.ukCosts = action.payload
      }
    }
  },
})


export const { boolToggleFunc , underOrOver10kUsdFunc , salesTaxFunc , otherCostFunc , UkVatRateFunc , FeeVatRateFunc , ukCostsFunc} = toggleSlice.actions

export default toggleSlice.reducer