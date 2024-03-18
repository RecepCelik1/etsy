import { useDispatch, useSelector } from "react-redux" 
import CountryFlag from 'react-country-flag';  
/* 

      ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - ((100*100*ukVatRate)/(100 + ukVatRate)) - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate) // vergi dahil breakeven

*/

/*

    ukBreakEvenPrice = ((ukCostWithoutFees + ukEtsyListingFee + 0.20 + ((0.20*GBP*vatFeeRate)/(100)) +((0.2*vatFeeRate)/100))*10000) / (8925 - 100*currenyDifferenceRate - 100*offSiteAdsRate - 100*ukVatRate - currenyDifferenceRate*vatFeeRate - offSiteAdsRate*vatFeeRate - 10.75*vatFeeRate) // vergi dahil değil breakeven

*/

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

const Consequences = () => {

  //common variables

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


  //for United States 

  const salesTaxRate = useSelector(state => state.toggle.salesTax)
  const usOtherCosts = useSelector(state => state.toggle.otherCost)

  let usSalesTax = ((itemMarketSoldPrice * salesTaxRate)/100) * 3/100
  //usSalesTax = parseFloat(usSalesTax.toFixed(2))

  let usEtsyPaymentFee = ((itemMarketSoldPrice * 3) / 100) + (25/100) + currencyDifference + usSalesTax
  //parseFloat(usEtsyPaymentFee.toFixed(2))

  let usTotalFees = etsyListingFee + usEtsyPaymentFee + transictionFee + offSiteAdds
  usTotalFees = parseFloat(usTotalFees.toFixed(2))

  let usCostsWithoutFees = itemCost + shippingCost + usOtherCosts
  //usCostsWithoutFees = parseFloat(usCostsWithoutFees.toFixed(2))

  let usTotalProfitPerItem = itemMarketSoldPrice - (usCostsWithoutFees + usTotalFees)
  usTotalProfitPerItem = parseFloat(usTotalProfitPerItem.toFixed(2))
  
  let usProfitMargin = (usTotalProfitPerItem / itemMarketSoldPrice) * 100
  usProfitMargin = parseFloat(usProfitMargin.toFixed(2))

  let usReturnOnCost = (usTotalProfitPerItem / itemCost) * 100
  usReturnOnCost = parseFloat(usReturnOnCost.toFixed(2))

  let usAverageFeeRate = (usTotalFees / itemMarketSoldPrice) * 100
  usAverageFeeRate = parseFloat(usAverageFeeRate.toFixed(2))

  let usBreakEvenPrice = 0

  if(offSiteAdsRate === 12 && usCostsWithoutFees >= 833.33*((9050-100*currenyDifferenceRate-3*salesTaxRate-100*offSiteAdsRate))/(100*100)){
    usBreakEvenPrice = ((usCostsWithoutFees + 0.45 + 100)*(100*100))/(9050-100*currenyDifferenceRate-3*salesTaxRate)
  } 
  else if(offSiteAdsRate === 15 && usCostsWithoutFees >= 666.66*((9050-100*currenyDifferenceRate-3*salesTaxRate-100*offSiteAdsRate))/(100*100)){
    usBreakEvenPrice = ((usCostsWithoutFees + 0.45 + 100)*(100*100))/(9050-100*currenyDifferenceRate-3*salesTaxRate)
  }  
  else {
    usBreakEvenPrice = ((usCostsWithoutFees + 0.45)*(100*100))/(9050-100*currenyDifferenceRate-3*salesTaxRate-100*offSiteAdsRate)
  }  

  usBreakEvenPrice = usBreakEvenPrice - shippingCharge
  usBreakEvenPrice = parseFloat(usBreakEvenPrice.toFixed(2))
  if(usBreakEvenPrice < 0) {
    usBreakEvenPrice = 0
  }

  let usChartProfitSlice = usProfitMargin
  usChartProfitSlice = parseFloat(usChartProfitSlice.toFixed(2))



  if(usChartProfitSlice < 0){
    usChartProfitSlice = 0
  }

  const usData = {
    /*         labels: [`Fees & Costs = ${parseFloat((100-profitPercentage).toFixed(2))} %` , `Total Profit = ${parseFloat(profitPercentage.toFixed(2))} %`], */
            datasets: [
              {
                data: [100-usChartProfitSlice , usChartProfitSlice],
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
        rotation: -((100 - usChartProfitSlice) / 100) * 360 / 2,
      };

      const [USbreakEvenPriceState , USsetBreakEvenPriceState] = useState(0)
      const [USProfit , USsetProfit] = useState(0)
      const [USfee , USsetfee] = useState(0)
      const [USListingFee , SETusListingFee] = useState(0)
      const [USPaymentfee , SETPaymentfee] = useState(0)
      const [USAvgFeeRate , SETAvgFeeRate] = useState(0)

      useEffect(()=> {
        USsetBreakEvenPriceState(usBreakEvenPrice)
        USsetProfit(usTotalProfitPerItem)
        USsetfee(usTotalFees)
        SETusListingFee(etsyListingFee)
        SETPaymentfee(usEtsyPaymentFee)
        SETAvgFeeRate(usAverageFeeRate)
       },[usBreakEvenPrice , usTotalProfitPerItem , usTotalFees , etsyListingFee , usEtsyPaymentFee , shippingCharge , usAverageFeeRate])

       useEffect (()=> {
        USsetBreakEvenPriceState(0)
        USsetProfit(0)
        USsetfee(0)
        SETusListingFee(0)
        SETPaymentfee(0)
        SETAvgFeeRate(0)
       },[])

      const dispatch = useDispatch()

      const ResetCalculator = () => {

        dispatch(priceReset());
        dispatch(CountryReset());
        dispatch(togglesReset());

        setTimeout(() => {
          USsetBreakEvenPriceState(0)
          USsetProfit(0)
          USsetfee(0)
          SETusListingFee(0)
          SETPaymentfee(0)
          SETAvgFeeRate(0)
        }, 0);

      }

      let textColor
      if(parseFloat(USProfit.toFixed(2)) > 0){

        textColor = "text-green-600"

      } else if(parseFloat(USProfit.toFixed(2)) === 0){

        textColor = "text-black"

      } else if(parseFloat(USProfit.toFixed(2)) < 0) {
        textColor = "text-red-600"
      }

  return (
    <div className="flex flex-col items-center mb-4 w-full p-2">

        <div className="w-full flex flex-col items-center">
            <div className="flex justify-between bg-gray-200 rounded-md mb-6 w-full">
                <div className="flex justify-center items-center mt-2 mb-2 ml-4 font-bold text-md">Total Profit Per Item</div>
                
                <div className={`flex justify-center items-center mt-2 mb-2 mr-4 font-bold text-md ${textColor}`}>${parseFloat(USProfit.toFixed(2))}</div>
            </div>
  
            <div className='flex flex-col w-full bg-gray-200 rounded-md sm:flex-row p-4'>
            <div className="w-full sm:w-7/12 flex flex-col">

            <div className="flex justify-between mt-2 mb-2">
              <div className="text-sm font-semibold">Profit Margin <p className="text-gray-600 text-xs">Total Profit / Total Revenue</p></div>
                <div className="flex justify-center items-center mr-2 text-sm font-medium">{isFinite(parseFloat(usProfitMargin.toFixed(2))) === false ? 0 : parseFloat(usProfitMargin.toFixed(2))} %</div>
              </div>

              <div className=" flex justify-between mt-2 mb-2">
              <div className="text-sm font-semibold">Return on Cost <p className="text-gray-600 text-xs">Total Profit / Item Cost</p></div>
                <div className="flex justify-center items-center mr-2 text-sm font-medium">{isFinite(parseFloat(usReturnOnCost.toFixed(2))) === false ? 0 : parseFloat(usReturnOnCost.toFixed(2))} %</div>
              </div>

              <div className=" flex justify-between mt-2 mb-2">
                <div className="flex justify-center items-center font-bold">Breakeven Price</div>
                <div className="flex justify-center items-center font-bold mr-2 text-sm">$ {USbreakEvenPriceState.toFixed(2)}</div>
              </div>
              <div className='border-gray-400 border mt-2 mb-2'></div>

              <div className=" flex justify-between mt-2 mb-2">
                <div className="flex justify-center items-center font-bold text-sm">Total Fees</div>
                <div className="flex justify-center items-center font-bold mr-2 text-sm">$ {parseFloat(USfee.toFixed(2))}</div>
              </div>

              <div className=" flex justify-between mt-2 mb-2">
                <div className="font-semibold text-sm">Average Fee Rate<p className="text-gray-600 text-xs">Total Fees / Total Revenue</p></div>
                <div className="flex justify-center items-center mr-2 text-sm font-medium">{isFinite(parseFloat(USAvgFeeRate.toFixed(2)))===false ? 100 : parseFloat(USAvgFeeRate.toFixed(2))} %</div>
              </div>

              <div className="flex justify-center items-center w-full">
                <div className='w-full bg-gray-100 flex justify-center items-center mt-2 mb-2 rounded-xl text-xs h-6'>$ = US Dollar</div>
              </div>

            </div>

            <div className="w-full sm:w-5/12 flex justify-center items-center relative mb-5">

                <Doughnut
                  data={usData  }
                  options={options}
                ></Doughnut>
              
              <CountryFlag className='absolute bottom-0 right-0' countryCode="US" svg style={{ width: '64px', height: '32px' }} />

            </div>
          </div>
  
          <div className='text-white flex justify-center items-center mb-2 mt-2'>Detailed Breakdown</div>

          <div className="flex flex-col w-full bg-gray-200 rounded-md p-4">
            
          <div className=" flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Total Revenue</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {parseFloat(itemMarketSoldPrice.toFixed(2))}</div>
            </div>
            
            <div className='border-gray-400 border m-1'></div>

            <div className=" flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Listing Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {parseFloat(USListingFee.toFixed(2))}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Transaction Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {parseFloat(transictionFee.toFixed(2))}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Etsy Payment Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {parseFloat(USPaymentfee.toFixed(2))}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Offsite Add Fee</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {parseFloat(offSiteAdds.toFixed(2))}</div>
            </div>

            <div className='border-gray-400 border m-1'></div>

            <div className="flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Total Fees</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {USfee}</div>
            </div>

            <div className="flex justify-between mt-1">
              <div className="text-xs flex justify-center items-center font-semibold">Total Cost</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {usCostsWithoutFees}</div>
            </div>

            <div className='border-gray-400 border m-1'></div>

            <div className=" flex justify-between">
              <div className="text-xs flex justify-center items-center font-semibold">Total Profit</div>
              <div className="flex justify-center items-center text-xs font-semibold">$ {parseFloat(USProfit.toFixed(2))}</div>
            </div>
          </div>
        </div>
      
      <div className='flex justify-center items-center mt-2 '>
              <span 
              className='w-42 bg-sky-600 p-4 text-sm font-bold text-white rounded-md cursor-pointer hover:bg-sky-800 transition-all duration-200 ease-in-out flex justify-center items-center'
              onClick={() => ResetCalculator()}
              >Reset Calculator</span></div>

    </div>
  );
  
}

export default Consequences