import { useDispatch, useSelector } from "react-redux" 
import CountryFlag from 'react-country-flag';  

import { 
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { priceReset } from "../redux/priceSlice";
import { CountryReset } from "../redux/countrySlice";
import { togglesReset } from "../redux/toggleSlice";
import { useEffect, useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const UKconsequences = () => {

    let currencies = useSelector(state => state.currency.currency)
    let GBP = currencies.data?.GBP
    GBP = parseFloat(GBP?.toFixed(1))
  
    let itemSoldPRice = useSelector(state => state.price.soldPrice);
    itemSoldPRice = parseFloat(itemSoldPRice)
    if(isNaN(itemSoldPRice)){
      itemSoldPRice = 0
    }
  
    let itemCost = useSelector(state => state.price.cost);
    itemCost = parseFloat(itemCost)
    if(isNaN(itemCost)){
      itemCost = 0
    }
  
    let shippingCharge = useSelector(state => state.price.shippingCharge);
    shippingCharge = parseFloat(shippingCharge)
    if(isNaN(shippingCharge)){
      shippingCharge = 0
    }
  
    let shippingCost = useSelector(state => state.price.shipping);
    shippingCost = parseFloat(shippingCost)
    if(isNaN(shippingCost)){
      shippingCost = 0
    }

    const currenyDifferenceRate = useSelector(state => state.toggle.currencyDifferenceRate);
    const offSiteAdsRate = useSelector(state => state.toggle.underOrOver10kUsd);
  
    let itemMarketSoldPrice = itemSoldPRice + shippingCharge
    itemMarketSoldPrice = parseFloat(itemMarketSoldPrice.toFixed(2))
    
    const etsyListingFee = 20/100
  
    let offSiteAdds = (itemMarketSoldPrice * offSiteAdsRate)/100
    offSiteAdds = parseFloat(offSiteAdds.toFixed(2))
  
    let ukOffSiteAds = (itemMarketSoldPrice * offSiteAdsRate)/100
  
    if(offSiteAdds > 100) {
      offSiteAdds = 100
    }
  
    if(ukOffSiteAds/GBP >= 100) {
      ukOffSiteAds = 100*GBP
    }
  
  
    let transictionFee = ((itemMarketSoldPrice * 65) / 1000)
    //transictionFee = parseFloat(transictionFee.toFixed(2))
  
    let currencyDifference = ((itemMarketSoldPrice * currenyDifferenceRate) / 100)
    //currencyDifference = parseFloat(currencyDifference.toFixed(2))

    const ukVatRate = useSelector(state => state.toggle.UkVatRate)
    const UkVatInclusive = useSelector(state => state.toggle.UkVatInclusive)
    const vatFeeRate = useSelector(state => state.toggle.vatFeeRate)
    const ukCosts = useSelector(state => state.toggle.ukCosts)
    //ukOffSiteAds unutma
    let ukEtsyListingFee = etsyListingFee * GBP
    ukEtsyListingFee = parseFloat(ukEtsyListingFee.toFixed(2))
    //transictionFee
  
    let ukVatOnRevenue = 0
  
    if(UkVatInclusive === true) {
      ukVatOnRevenue = ((itemMarketSoldPrice * 100) / (100 + ukVatRate) * (ukVatRate / 100))
    } else {
      ukVatOnRevenue = (itemMarketSoldPrice * ukVatRate)/100
    }
  
  
    let ukEtsyPaymentFee = (itemMarketSoldPrice * (425/10000)) + 20/100 + currencyDifference
   // ukEtsyPaymentFee = parseFloat(ukEtsyPaymentFee.toFixed(2))
    
    let ukTotalFees = ukEtsyListingFee + ukEtsyPaymentFee + transictionFee + ukOffSiteAds
    //ukTotalFees = parseFloat(ukTotalFees.toFixed(2))
  
    let ukVatOnFees = (ukTotalFees * vatFeeRate) / 100
    //ukVatOnFees = parseFloat(ukVatOnFees.toFixed(2))
  
    let ukCostWithoutFees = itemCost + shippingCost + ukCosts
    //ukCostWithoutFees = parseFloat(ukCostWithoutFees.toFixed(2))
  
    let ukTotalVats = ukVatOnRevenue + ukVatOnFees
    //ukTotalVats = parseFloat(ukTotalVats.toFixed(2))
  
    let ukTotalProfitPerItem = itemMarketSoldPrice - (ukCostWithoutFees + ukTotalFees + ukTotalVats)
    ukTotalProfitPerItem = parseFloat(ukTotalProfitPerItem.toFixed(2))
  
    let ukProfitMargin = (ukTotalProfitPerItem / itemMarketSoldPrice) * 100
    //ukProfitMargin = parseFloat(ukProfitMargin.toFixed(2))
  
    let ukReturnOnCost = (ukTotalProfitPerItem / itemCost) * 100
    ukReturnOnCost = parseFloat(ukReturnOnCost.toFixed(2))
  
    let ukBreakEvenPrice = 0
  
    let ukAverageFeeRate = (ukTotalFees / itemMarketSoldPrice) * 100
    ukAverageFeeRate = parseFloat(ukAverageFeeRate.toFixed(2))
  
    if (UkVatInclusive === true) {
  
      if(offSiteAdsRate === 12 && ukCostWithoutFees >= (833.33*(8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - ((100*100*ukVatRate)/(100 + ukVatRate)) - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate))/(100*100)) {
  
        ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 100*GBP + (100*GBP*vatFeeRate / 100) + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - ((100*100*ukVatRate)/(100 + ukVatRate)) - currenyDifferenceRate*vatFeeRate - 10.75*vatFeeRate)
  
      } else if(offSiteAdsRate === 15 && ukCostWithoutFees >= (666.66*(8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - ((100*100*ukVatRate)/(100 + ukVatRate)) - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate))/(100*100)) {
  
        ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 100*GBP + (100*GBP*vatFeeRate / 100) + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - ((100*100*ukVatRate)/(100 + ukVatRate)) - currenyDifferenceRate*vatFeeRate - 10.75*vatFeeRate)
  
      } else {
  
        ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - ((100*100*ukVatRate)/(100 + ukVatRate)) - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate)
  
      }
  
      
    } else {
  
  
      if(offSiteAdsRate === 12 && ukCostWithoutFees >= (833.33*(8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - 100*ukVatRate - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate))/(100*100)) {
  
        ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 100*GBP + (100*GBP*vatFeeRate/100) + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - 100*ukVatRate - currenyDifferenceRate*vatFeeRate - 10.75*vatFeeRate)
  
      } else if(offSiteAdsRate === 15 && ukCostWithoutFees >= (666.66*(8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - 100*ukVatRate - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate))/(100*100)) {
  
        ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 100*GBP + (100*GBP*vatFeeRate/100) + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - 100*ukVatRate - currenyDifferenceRate*vatFeeRate - 10.75*vatFeeRate)
  
      } else {
  
        ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - 100*ukVatRate - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate)
  
      }
  
  
    }
  
    let ukChartProfitSlice = ukProfitMargin
    ukChartProfitSlice = parseFloat(ukChartProfitSlice.toFixed(2))
  
    if(ukChartProfitSlice < 0){
      ukChartProfitSlice = 0
    }
  
      const ukData = {
  /*         labels: [`Fees & Costs = ${parseFloat((100-profitPercentage).toFixed(2))} %` , `Total Profit = ${parseFloat(profitPercentage.toFixed(2))} %`], */
          datasets: [
            {
              data: [100-ukChartProfitSlice , ukChartProfitSlice],
              backgroundColor: [
                "rgb(2, 132, 199)",
                "rgb(16, 185, 129)",
              ],
              hoverOffset: 4,
            },
          ],
        }
  
        const options = {
          cutout: 80,
          radius: "60%",
          borderWidth: 0,
          rotation: -((100 - ukChartProfitSlice) / 100) * 360 / 2,
        };

        const [UKbreakEvenPriceState , UKsetBreakEvenPriceState] = useState(0)
        const [UKProfit , UKsetProfit] = useState(0)
        const [UKfee , UKsetfee] = useState(0)
        const [UKListingFee , setUKListingFee] = useState(0)
        const [UKPaymentfee , setUKPaymentfee] = useState(0)
        const [UKFeeRate , setUKFeeRate] = useState(0)
  
        useEffect(()=> {
          UKsetBreakEvenPriceState(ukBreakEvenPrice - shippingCharge)
          UKsetProfit(ukTotalProfitPerItem)
          UKsetfee(ukTotalFees)
          setUKListingFee(ukEtsyListingFee)
          setUKPaymentfee(ukEtsyPaymentFee)
          setUKFeeRate(ukAverageFeeRate)
         },[ukBreakEvenPrice , ukTotalProfitPerItem , ukTotalFees , ukEtsyListingFee , ukEtsyPaymentFee, ukAverageFeeRate, shippingCharge])

         useEffect (()=> {
            UKsetBreakEvenPriceState(0)
            UKsetProfit(0)
            UKsetfee(0)
            setUKListingFee(0)
            setUKPaymentfee(0)
            setUKFeeRate(0)
           },[])

         const dispatch = useDispatch()

         const ResetCalculator = () => {
   
           dispatch(priceReset());
           dispatch(CountryReset());
           dispatch(togglesReset());
   
           setTimeout(() => {
             UKsetBreakEvenPriceState(0)
             UKsetProfit(0)
             UKsetfee(0)
             setUKListingFee(0)
             setUKPaymentfee(0)
             setUKFeeRate(0)
           }, 0);
   
         }

         let textColor
         if(parseFloat(UKProfit.toFixed(2)) > 0){
   
           textColor = "text-green-600"
   
         } else if(parseFloat(UKProfit.toFixed(2)) === 0){
   
           textColor = "text-black"
   
         } else if(parseFloat(UKProfit.toFixed(2)) < 0) {
           textColor = "text-red-600"
         }

         return (
            <div className="w-full flex flex-col items-center p-2">
            <div className="flex justify-between bg-gray-200 rounded-md mb-6 w-full">
                <div className="flex justify-center items-center mt-2 mb-2 ml-4 font-bold text-md">Total Profit Per Item</div>
                
                <div className={`flex justify-center items-center mt-2 mb-2 mr-4 font-bold text-md ${textColor}`}>£{parseFloat(UKProfit.toFixed(2))}</div>
            </div>
  
            <div className='flex flex-col w-full bg-gray-200 rounded-md sm:flex-row p-4'>

            <div className="w-full sm:w-7/12 flex flex-col">

              <div className="flex justify-between mt-2 mb-2">
              <div className="text-sm font-semibold">Profit Margin <p className="text-gray-600 text-xs">Total Profit / Total Revenue</p></div>
                <div className="flex justify-center items-center mr-2 text-sm font-medium">{isFinite(parseFloat(ukProfitMargin.toFixed(2))) === false ? 0 : parseFloat(ukProfitMargin.toFixed(2))} %</div>
              </div>

              <div className=" flex justify-between mt-2 mb-2">
              <div className="text-sm font-semibold">Return on Cost <p className="text-gray-600 text-xs">Total Profit / Item Cost</p></div>
                <div className="flex justify-center items-center mr-2 text-sm font-medium">{isFinite(parseFloat(ukReturnOnCost.toFixed(2))) === false ? 0 : parseFloat(ukReturnOnCost.toFixed(2))} %</div>
              </div>
              
              <div className=" flex justify-between mt-2 mb-2">
                <div className="flex justify-center items-center font-bold">Breakeven Price</div>
                <div className="flex justify-center items-center font-bold mr-2 text-sm">£ {UKbreakEvenPriceState.toFixed(2 )}</div>
              </div>

              <div className='border-gray-400 border mt-2 mb-2'></div>

              <div className=" flex justify-between mt-2 mb-2">
                <div className="flex justify-center items-center font-bold text-sm">Total Fees</div>
                <div className="flex justify-center items-center font-bold mr-2 text-sm">£ {parseFloat(UKfee.toFixed(2))}</div>
              </div>

              <div className=" flex justify-between mt-2 mb-2">
                <div className="font-semibold text-sm">Average Fee Rate<p className="text-gray-600 text-xs">Total Fees / Total Revenue</p></div>
                <div className="flex justify-center items-center mr-2 text-sm font-medium">{isFinite(parseFloat(UKFeeRate.toFixed(2)))===false ? 100 : parseFloat(UKFeeRate.toFixed(2))} %</div>
              </div>

              <div className="flex justify-center items-center w-full">
                <div className='w-full bg-gray-100 flex justify-center items-center mt-2 mb-2 rounded-xl text-xs h-6'>£ = Pound Sterling</div>
              </div>
            </div>

            <div className="w-full sm:w-5/12 flex justify-center items-center relative mb-5">

                <Doughnut
                  data={ukData}
                  options={options}
                ></Doughnut>
              
                <CountryFlag className='absolute bottom-0 right-0' countryCode="GB" svg style={{ width: '64px', height: '32px' }} />

            </div>
          </div>
  
          <div className='text-white flex justify-center items-center mb-2 mt-2'>Detailed Breakdown</div>

          <div className="flex flex-col w-full bg-gray-200 rounded-md p-4">

            <div className=" flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Total Revenue</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(itemMarketSoldPrice.toFixed(2))}</div>
            </div>

            <div className='border-gray-400 border m-1'></div>

            <div className=" flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Listing Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(UKListingFee.toFixed(2))}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Transaction Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(transictionFee.toFixed(2))}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Etsy Payment Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(UKPaymentfee.toFixed(2))}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Offsite Add Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(ukOffSiteAds.toFixed(2))}</div>
            </div>

            <div className='border-gray-400 border m-1'></div>
            <div className="flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Total Fees</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(UKfee.toFixed(2))}</div>
            </div>
            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Total Cost</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(ukCostWithoutFees.toFixed(2))}</div>
            </div>
            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Additional Vat</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(ukTotalVats.toFixed(2))}</div>
            </div>
            <div className='border-gray-400 border m-1'></div>

            <div className="flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Total Profit</div>
              <div className="flex justify-center items-center text-xs font-semibold">£ {parseFloat(UKProfit.toFixed(2))}</div>
            </div>
          </div>
          <div className='flex justify-center items-center mt-2 '>
              <span 
              className='w-42 bg-sky-600 p-4 text-sm font-bold text-white rounded-md cursor-pointer hover:bg-sky-800 transition-all duration-200 ease-in-out flex justify-center items-center'
              onClick={() => ResetCalculator()}
              >Reset Calculator</span></div>
        </div>

)}

export default UKconsequences