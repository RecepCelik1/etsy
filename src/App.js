
import { useDispatch , useSelector } from "react-redux";
import { priceFunc , costFunc , shippingChargeFunc , shippingFunc } from "./redux/priceSlice";
import Options from "./components/options";
import Consequences from "./components/consequences";
//import PieChart from "./components/pieChart";

function App() {

  const dispatch = useDispatch()
/*   const soldPRice = useSelector(state => state.price.soldPrice)
  const itemCost = useSelector(state => state.price.cost)
  const shippingCharge = useSelector(state => state.price.shippingCharge)
  const shippingCost = useSelector(state => state.price.shipping)  */ 
  
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
    <div className="bg-[#282c34] h-full flex justify-center">
      <div className="w-3/6 h-full bg-slate-500 flex flex-col items-center mb-12">

        <div className="price w-full mt-36 flex justify-between">

            <div className="w-4/5 flex flex-col items-center bg-slate-300 mr-2 ml-2">
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12 w-full">Item Sold Price</span>
                  <input type="text" className="w-16 ml-12" onChange={(e) => handleInputChange(e , "soldPrice")}></input>
              </div>
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12">Item Cost</span>
                  <input type="text" className="w-16 ml-12" onChange={(e) => handleInputChange(e , "itemCost")}></input>
              </div>
            </div>

            <div className="w-4/5 flex flex-col items-center bg-slate-300 mr-2 ml-2">
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12">Shipping Charge</span>
                  <input type="text" className="w-16 ml-12" onChange={(e) => handleInputChange(e , "shippingCharge")}></input>
              </div>
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12">Shipping Cost</span>
                  <input type="text" className="w-16 ml-12" onChange={(e) => handleInputChange(e , "shippingCost")}></input>
              </div>
            </div>

        </div>
        
        <Options/>

        <div className="mt-4 flex justify-center">
          Estimated Results
        </div>
        
        <Consequences/>

        <span className="flex justify-center bg-black m-2 rounded-xl cursor-pointer">
          <span className="text-white ml-2 mr-2"> Reset Calculator</span>
        </span>
      </div>
    </div>
  );
}

export default App;
