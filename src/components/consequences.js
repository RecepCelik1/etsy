import { useEffect } from "react"
import { useSelector } from "react-redux"


const Consequences = () => {

    const selectedCountry = useSelector(state => state.country.country) 
    const itemPrice = useSelector(state => state.price.soldPrice)
    const itemCost = useSelector(state => state.price.cost)
    const shippingCharge = useSelector(state => state.price.shippingCharge)
    const shippingCost = useSelector(state => state.price.shipping)
    const offSiteAdds = useSelector(state => state.toggle.underOrOver10kUsd)
    const currenyDifference = useSelector(state => state.toggle.currencyDifferenceRate)
    let itemSoldPrice = itemPrice + shippingCharge //item mağaza satış fiyatı
    const etsyListingFee = 20/100

    const salesTax = useSelector(state => state.toggle.salesTax)
    const otherCosts = useSelector(state => state.toggle.otherCost)
    let transictionFee = (itemSoldPrice * (65/1000))
    transictionFee = parseFloat(transictionFee.toFixed(2))
    let usEtsyPaymentFee = ((itemSoldPrice * (3/100)) + 25/100)
    usEtsyPaymentFee = parseFloat(usEtsyPaymentFee.toFixed(2))
    let offSiteAddCosts = ((itemSoldPrice * offSiteAdds)/100)
    offSiteAddCosts = parseFloat(offSiteAddCosts.toFixed(2))
    let usTotalCost = (
      (itemCost + shippingCost) +
      (offSiteAddCosts) +
      ((itemSoldPrice * currenyDifference) / 100) +
      (((itemSoldPrice * salesTax) / 100) * (3/100)) +
      (otherCosts) +
      (usEtsyPaymentFee) +
      (etsyListingFee) +
      (transictionFee)
  ); 

    let usTotalProfit = itemSoldPrice - usTotalCost
    let usTotalFees = ((itemSoldPrice * offSiteAdds) / 100) + ((itemSoldPrice * currenyDifference) / 100) +
    (((itemSoldPrice * salesTax) / 100) * (3/100)) + (usEtsyPaymentFee) + (etsyListingFee) + (transictionFee);
    usTotalFees = parseFloat(usTotalFees.toFixed(2))

    let usAverageFeeRate = (usTotalFees / itemSoldPrice) * 100
    usAverageFeeRate = parseFloat(usAverageFeeRate.toFixed(2))
    usTotalProfit = parseFloat(usTotalProfit.toFixed(2));

    let usProfitMargin = (usTotalProfit/itemSoldPrice)*100;
    usProfitMargin = parseFloat(usProfitMargin.toFixed(2))
      
    let usReturnOnCost = (usTotalProfit / itemCost)*100
    usReturnOnCost = parseFloat(usReturnOnCost.toFixed(2))

    let usBreakEvenPrice = (((itemCost + shippingCost) + 45/100)*1000)/(905-10*offSiteAdds) //dokunma hassas aritmetik !!!!
    usBreakEvenPrice = parseFloat(usBreakEvenPrice.toFixed(2))  
    
    
    return(
        <div className="flex flex-col items-center mb-12 w-full">
        
        
        
        <div className="w-full flex flex-col items-center">
            <div className="mt-4 flex w-full justify-center">
                <div className="mt-2 mb-2 w-full ml-2 h-full bg-slate-300 flex items-center">Total Profit Per Item</div>
                <div className="mt-2 mb-2 w-full mr-2 h-full flex justify-end bg-slate-300 items-center">{usTotalProfit}</div>
            </div>

            <div className="mt-4 w-full mr-4">
          <div className="ml-4 flex flex-col justify-start bg-slate-300">
            <div className=" flex justify-between mt-2 mb-2">
              <div>Profit Margin <p>Total Profit / Total Revenue</p></div>
              <div className="flex items-center">{isFinite(usProfitMargin) === false ? 0 : usProfitMargin}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Return on Cost <p>Total Profit / Item Cost</p></div>
              <div className="flex items-center">{isFinite(usReturnOnCost) === false ? 0 : usReturnOnCost}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div className="font-bold">Breakeven Price</div>
              <div className="flex items-center">{usBreakEvenPrice}</div>
            </div>

            <div className="vertical-line w-full border-t border-black "></div>

            <div className=" flex justify-between mt-2 mb-2">
              <div className="font-bold">Total Fees</div>
              <div className="flex items-center">{usTotalFees}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Average Fee Rate<p>Total Fees / Total Revenue</p></div>
              <div className="flex items-center">% {isFinite(usAverageFeeRate)===false ? 100 : usAverageFeeRate}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div className="flex justify-center w-full bg-slate-200 rounded-xl">$ = US Dollar</div>
            </div>
          </div>

          <div className="w-1/3 pieChart gelicek">
           
          </div>

        </div>

        <div className="mt-4 mb-4">
          Detailed Breakdown
        </div>

        <div className="w-3/4 b-slate-300 flex flex-col bg-slate-300">
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Revenue</div>
              <div className="flex items-center">$ {itemSoldPrice}</div>
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
              <div className="flex items-center">$ {offSiteAddCosts}</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Fees</div>
              <div className="flex items-center">$ {usTotalFees}</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Cost</div>
              <div className="flex items-center">$ {itemCost + shippingCost}</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Profit</div>
              <div className="flex items-center">$ {usTotalProfit}</div>
            </div>
        </div>

        </div>
       
            
        </div>
    )
}

export default Consequences