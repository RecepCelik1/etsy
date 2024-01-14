import { useSelector } from "react-redux" 

import { 
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Consequences = () => {

  //common variables

  const selectedCountry = useSelector(state => state.country.country);

  let currencies = useSelector(state => state.currency.currency)
  let GBP = currencies.data?.GBP
  const itemSoldPRice = useSelector(state => state.price.soldPrice);
  const itemCost = useSelector(state => state.price.cost);
  const shippingCharge = useSelector(state => state.price.shippingCharge);
  const shippingCost = useSelector(state => state.price.shipping);
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
    ukOffSiteAds = 0
    ukOffSiteAds = offSiteAdds*GBP + ukOffSiteAds
  }

  console.log("ukOffSiteAds : " , ukOffSiteAds)

  let transictionFee = ((itemMarketSoldPrice * 65) / 1000)


  let currencyDifference = ((itemMarketSoldPrice * currenyDifferenceRate) / 100)
  currencyDifference = parseFloat(currencyDifference.toFixed(2))


  //for United States 

  const salesTaxRate = useSelector(state => state.toggle.salesTax)
  const usOtherCosts = useSelector(state => state.toggle.otherCost)

  let usSalesTax = ((itemMarketSoldPrice * salesTaxRate)/100) * 3/100

  let usEtsyPaymentFee = ((itemMarketSoldPrice * 3) / 100) + (25/100) + currencyDifference + usSalesTax
  parseFloat(usEtsyPaymentFee.toFixed(2))

  let usTotalFees = etsyListingFee + usEtsyPaymentFee + transictionFee + offSiteAdds

  let usCostsWithoutFees = itemCost + shippingCost + usOtherCosts

  let usTotalProfitPerItem = itemMarketSoldPrice - (usCostsWithoutFees + usTotalFees)

  let usProfitMargin = (usTotalProfitPerItem / itemMarketSoldPrice) * 100

  let usReturnOnCost = (usTotalProfitPerItem / itemCost) * 100

  let usBreakEvenPrice = ((usCostsWithoutFees + 45/100) * 100)/(88 - (3 * salesTaxRate) - offSiteAdds)

  let usAverageFeeRate = (usTotalFees / itemMarketSoldPrice) * 100


  // for United Kingdom

  const ukVatRate = useSelector(state => state.toggle.UkVatRate)
  const UkVatInclusive = useSelector(state => state.toggle.UkVatInclusive)
  const vatFeeRate = useSelector(state => state.toggle.vatFeeRate)
  const ukCosts = useSelector(state => state.toggle.ukCosts)
  //ukOffSiteAds unutma
  let ukEtsyListingFee = etsyListingFee * GBP
  //transictionFee

  let ukVatOnRevenue = 0

  if(UkVatInclusive === true) {
    ukVatOnRevenue = ((itemMarketSoldPrice * 100) / (100 + ukVatRate) * (ukVatRate / 100)) 
  } else {
    ukVatOnRevenue = (itemMarketSoldPrice * ukVatRate)/100
  }


  let ukEtsyPaymentFee = (itemMarketSoldPrice * (425/10000)) + 20/100 + currencyDifference
  
  let ukTotalFees = ukEtsyListingFee + ukEtsyPaymentFee + transictionFee + ukOffSiteAds

  let ukVatOnFees = (ukTotalFees * vatFeeRate) / 100

  let ukCostWithoutFees = itemCost + shippingCost + ukCosts

  let ukTotalVats = ukVatOnRevenue + ukVatOnFees

  let ukTotalProfitPerItem = itemMarketSoldPrice - (ukCostWithoutFees + ukTotalFees + ukTotalVats)

  let ukProfitMargin = (ukTotalProfitPerItem / itemMarketSoldPrice) * 100

  let ukReturnOnCost = (ukTotalProfitPerItem / itemCost) * 100

  console.log("ukTotalProfitPerItem : " , ukTotalProfitPerItem , "ukCostWithoutFees : " , ukCostWithoutFees , "ukReturnOnCost : " , ukReturnOnCost)

  let ukBreakEvenPrice = 0
  
  //şu anlık çalışmıyor
  if(UkVatInclusive === false) {
    ukBreakEvenPrice = 1000*(ukCostWithoutFees + ukEtsyListingFee + 0.2 + ((2*vatFeeRate)/100)) / 
    (-325 - (13,25*vatFeeRate) - 100*offSiteAdsRate - 100*ukVatRate - vatFeeRate*offSiteAdsRate) + ukBreakEvenPrice
  } else {
    ukBreakEvenPrice = 1000*(ukCostWithoutFees + ukEtsyListingFee + 0.2 + ((2*vatFeeRate)/100)) / 
    (-325 - (13,25*vatFeeRate) - 100*offSiteAdsRate - 100*(100/((100+ukVatRate) + (ukVatRate/100))) - vatFeeRate*offSiteAdsRate)
    + ukBreakEvenPrice
  }

  let ukAverageFeeRate = (ukTotalFees / itemMarketSoldPrice) * 100

  let usChartProfitSlice = usProfitMargin
  usChartProfitSlice = parseFloat(usChartProfitSlice.toFixed(2))
  if(usChartProfitSlice < 0){
    usChartProfitSlice = 0
  }
  const usData = {
    labels : [`Fees & Costs => ${parseFloat((100-usChartProfitSlice).toFixed(2))}` , `Total Profit => ${parseFloat(usChartProfitSlice.toFixed(2))}`],
    datasets : [{
      label : '',
      data : [ 100-usChartProfitSlice , usChartProfitSlice ],
      backgroundColor : ['blue' , 'green'],
      borderColor : ['blue' , 'green'],
    }]
  }

  let ukChartProfitSlice = ukProfitMargin
  ukChartProfitSlice = parseFloat(ukChartProfitSlice.toFixed(2))
  if(ukChartProfitSlice < 0){
    ukChartProfitSlice = 0
  }
  const ukData = {
    labels : [`Fees & Costs => ${parseFloat((100-ukChartProfitSlice).toFixed(2))}` , `Total Profit => ${parseFloat(ukChartProfitSlice.toFixed(2))}`],
    datasets : [{
      label : '',
      data : [ 100-ukChartProfitSlice , ukChartProfitSlice ],
      backgroundColor : ['blue' , 'green'],
      borderColor : ['blue' , 'green'],
    }]
  }

  const options = {

  }

  return (
    <div className="flex flex-col items-center mb-12 w-full">
  
      {selectedCountry.value === "UK" && (
        <div className="w-full flex flex-col items-center">
          <div className="mt-4 flex w-full justify-center">
            <div className="mt-2 mb-2 w-full h-full bg-slate-300 flex items-center">Total Profit Per Item</div>
            <div className="mt-2 mb-2 w-full h-full flex justify-end bg-slate-300 items-center">{parseFloat(ukTotalProfitPerItem.toFixed(2))}</div>
          </div>
  
          <div className="mt-4 w-full bg-slate-300 flex flex-wrap justify-between">
            <div className="ml-4 flex flex-col justify-start w-full sm:w-1/2 md:w-1/3">
              <div className="flex justify-between mt-2 mb-2">
                <div>Profit Margin <p>Total Profit / Total Revenue</p></div>
                <div className="flex items-center">% {isFinite(parseFloat(ukProfitMargin.toFixed(2))) === false ? 0 : parseFloat(ukProfitMargin.toFixed(2))}</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div>Return on Cost <p>Total Profit / Item Cost</p></div>
                <div className="flex items-center">{isFinite(parseFloat(ukReturnOnCost.toFixed(2))) === false ? 0 : parseFloat(ukReturnOnCost.toFixed(2))}</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div className="font-bold">Breakeven Price</div>
                <div className="flex items-center">{parseFloat(ukBreakEvenPrice.toFixed(2))}</div>
              </div>
              <div className="vertical-line w-full border-t border-black "></div>
              <div className=" flex justify-between mt-2 mb-2">
                <div className="font-bold">Total Fees</div>
                <div className="flex items-center">{parseFloat(ukTotalFees.toFixed(2))}</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div>Average Fee Rate<p>Total Fees / Total Revenue</p></div>
                <div className="flex items-center">% {isFinite(parseFloat(ukAverageFeeRate.toFixed(2)))===false ? 100 : parseFloat(ukAverageFeeRate.toFixed(2))}</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div className="flex justify-center w-full bg-slate-200 rounded-xl">£ = Pound Sterling</div>
              </div>
            </div>
            <div className="flex w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mt-10 ml-10 mr-10 sm:justify-center sm:mr-0 sm:ml-0  mb-5">
              <div className='flex w-full h-full justify-center'>
                <Doughnut
                  data={ukData}
                  options={options}
                ></Doughnut>
              </div>
            </div>
          </div>
  
          <div className="mt-4 mb-4 w-full md:w-3/4 bg-slate-300 xl:w-full">
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Revenue</div>
              <div className="flex items-center">{parseFloat(itemMarketSoldPrice.toFixed(2))} £</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Listing Fee</div>
              <div className="flex items-center">{parseFloat(ukEtsyListingFee.toFixed(2))} £</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Transaction Fee</div>
              <div className="flex items-center">{parseFloat(transictionFee.toFixed(2))} £</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Etsy Payment Fee</div>
              <div className="flex items-center">{parseFloat(ukEtsyPaymentFee.toFixed(2))} £</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Offsite Add Fee</div>
              <div className="flex items-center">{parseFloat(ukOffSiteAds.toFixed(2))} £</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Fees</div>
              <div className="flex items-center">{parseFloat(ukTotalFees.toFixed(2))} £</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Cost</div>
              <div className="flex items-center">{parseFloat(ukCostWithoutFees.toFixed(2))} £</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Additional Vat</div>
              <div className="flex items-center">{parseFloat(ukTotalVats.toFixed(2))} £</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Profit</div>
              <div className="flex items-center">{parseFloat(ukTotalProfitPerItem.toFixed(2))} £</div>
            </div>
          </div>
        </div>
      )}
  
      {selectedCountry.value === "US" && (
        <div className="w-full flex flex-col items-center">
          <div className="mt-4 flex w-full justify-center">
            <div className="mt-2 mb-2 w-full h-full bg-slate-300 flex items-center">Total Profit Per Item</div>
            <div className="mt-2 mb-2 w-full h-full flex justify-end bg-slate-300 items-center">{parseFloat(usTotalProfitPerItem.toFixed(2))}</div>
          </div>
  
          <div className="mt-4 w-full bg-slate-300 flex flex-wrap justify-between">
            <div className="ml-4 flex flex-col justify-start w-full sm:w-1/2 md:w-1/3">
              <div className="flex justify-between mt-2 mb-2">
                <div>Profit Margin <p>Total Profit / Total Revenue</p></div>
                <div className="flex items-center">{isFinite(parseFloat(usProfitMargin.toFixed(2))) === false ? 0 : parseFloat(usProfitMargin.toFixed(2))} %</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div>Return on Cost <p>Total Profit / Item Cost</p></div>
                <div className="flex items-center">{isFinite(parseFloat(usReturnOnCost.toFixed(2))) === false ? 0 : parseFloat(usReturnOnCost.toFixed(2))} %</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div className="font-bold">Breakeven Price</div>
                <div className="flex items-center">{parseFloat(usBreakEvenPrice.toFixed(2))}</div>
              </div>
              <div className="vertical-line w-full border-t border-black "></div>
              <div className=" flex justify-between mt-2 mb-2">
                <div className="font-bold">Total Fees</div>
                <div className="flex items-center">{usTotalFees}</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div>Average Fee Rate<p>Total Fees / Total Revenue</p></div>
                <div className="flex items-center">% {isFinite(parseFloat(usAverageFeeRate.toFixed(2)))===false ? 100 : parseFloat(usAverageFeeRate.toFixed(2))}</div>
              </div>
              <div className=" flex justify-between mt-2 mb-2">
                <div className="flex justify-center w-full bg-slate-200 rounded-xl">$ = US Dollar</div>
              </div>
            </div>
            <div className="flex w-full sm:w-1/2 md:w-2/3 lg:w-1/2 mt-10 ml-10 mr-10 sm:justify-center sm:mr-0 sm:ml-0  mb-5">
              <div className='flex w-full h-full justify-center'>
                <Doughnut
                  data={usData  }
                  options={options}
                ></Doughnut>
              </div>
            </div>
          </div>
  
          <div className="mt-4 mb-4 w-full md:w-3/4 bg-slate-300 xl:w-full">
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Revenue</div>
              <div className="flex items-center">$ {itemMarketSoldPrice}</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Listing Fee</div>
              <div className="flex items-center">$ {etsyListingFee}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Transaction Fee</div>
              <div className="flex items-center">$ {transictionFee}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Etsy Payment Fee</div>
              <div className="flex items-center">$ {usEtsyPaymentFee}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Offsite Add Fee</div>
              <div className="flex items-center">$ {offSiteAdds}</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Fees</div>
              <div className="flex items-center">$ {usTotalFees}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Cost</div>
              <div className="flex items-center">$ {usCostsWithoutFees}</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Profit</div>
              <div className="flex items-center">$ {parseFloat(usTotalProfitPerItem.toFixed(2))}</div>
            </div>
          </div>
        </div>
      )}
  
    </div>
  );
  
}

export default Consequences