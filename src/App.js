
import { useDispatch , useSelector } from "react-redux";
import { priceFunc , costFunc , shippingChargeFunc , shippingFunc } from "./redux/priceSlice";
import Options from "./components/options";
import Consequences from "./components/consequences";
import { useEffect } from "react";
import { getCurrency } from "./redux/currencyApiSlice";
//import PieChart from "./components/pieChart";

function App() {

  const dispatch = useDispatch()
/*   const soldPRice = useSelector(state => state.price.soldPrice)
  const itemCost = useSelector(state => state.price.cost)
  const shippingCharge = useSelector(state => state.price.shippingCharge)
  const shippingCost = useSelector(state => state.price.shipping)  */ 
  


  useEffect(()=> {
    dispatch(getCurrency())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const selectedCountry = useSelector(state => state.country.country)
  console.log("selectedCountry : " , selectedCountry)
  const handleInputChange = (event, field) => {
    const filteredValue = event.target.value.replace(/[^0-9,.]/g, "");
    let parsedValue = parseFloat(filteredValue.replace(",", "."));
    if(isNaN(parsedValue)){
      parsedValue = 0
    }
    

    if(field === "soldPrice"){
      dispatch(priceFunc(parsedValue))
    }
    if(field === "itemCost"){
      dispatch(costFunc(parsedValue))
    }
    if(field === "shippingCharge"){
      dispatch(shippingChargeFunc(parsedValue))
    }
    if(field === "shippingCost"){
      dispatch(shippingFunc(parsedValue))
    }
    
  };

  return (
    <div className="  h-full flex justify-center bg-[#282c34]">
      <div className="w-full md:w-1/6 lg:w-2/6 xl:w-3/6 h-full flex flex-col items-center ">
  
        <div className="price w-full mt-10 md:mt-36 flex flex-col md:flex-row justify-between">
  
          <div className="w-full md:w-4/5 flex flex-col items-center bg-slate-300 mb-4 md:mb-0">
            <div className="flex justify-between mt-3 mb-3">
              <span className="mr-2 md:mr-12 w-full md:w-auto">Item Sold Price</span>
              <input type="text" className="w-16 md:w-auto mr-1 md:ml-12" onChange={(e) => handleInputChange(e, "soldPrice")}></input>
            </div>
            <div className="flex justify-between mt-3 mb-3">
              <span className="mr-2 md:mr-12">Item Cost</span>
              <input type="text" className="w-16 md:w-auto mr-1 md:ml-12" onChange={(e) => handleInputChange(e, "itemCost")}></input>
            </div>
          </div>
  
          <div className="w-full md:w-4/5 flex flex-col items-center bg-slate-300 md:ml-2">
            <div className="flex justify-between mt-3 mb-3">
              <span className="mr-2 md:mr-12">Shipping Charge</span>
              <input type="text" className="w-16 md:w-auto mr-1 md:ml-12" onChange={(e) => handleInputChange(e, "shippingCharge")}></input>
            </div>
            <div className="flex justify-between mt-3 mb-3">
              <span className="mr-2 md:mr-12">Shipping Cost</span>
              <input type="text" className="w-16 md:w-auto mr-1 md:ml-12" onChange={(e) => handleInputChange(e, "shippingCost")}></input>
            </div>
          </div>
  
        </div>
  
        <Options />
  
        <div className="mt-4 flex justify-center bg-slate-300 font-bold w-full">
          Estimated Results
        </div>
  
        <Consequences />
  

      </div>
    </div>
  );
  
}

export default App;
