
import { useDispatch , useSelector } from "react-redux";
import { priceFunc , costFunc , shippingChargeFunc , shippingFunc } from "./redux/priceSlice";
import Options from "./components/options";
import Consequences from "./components/consequences";
import { useEffect, useRef } from "react";
import { getCurrency } from "./redux/currencyApiSlice";


function App() {

  const dispatch = useDispatch()

  const itemPriceInputRef = useRef(null);
  const itemCostInputRef = useRef(null);
  const shippingChargeInputRef = useRef(null);
  const shippingCostInputRef = useRef(null);


    const handleTextClick = (inputRef) => {

      if (inputRef.current) {
        inputRef.current.focus();
      }      

    };


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

    <div className="bg-gray-800 w-full h-full flex justify-center items-center overflow-x-auto">
      <div className="main-container flex flex-col w-full sm:max-w-[675px] mt-3">
  
      <div className="flex flex-col sm:flex-row justify-center">
                <div className='flex flex-col w-full sm:w-[50%]'>
    
                  <div className="bg-gray-200 rounded-md m-2 p-2">
                    <div className="flex justify-between m-2">
                      <div 
                        className="text-xs flex justify-center items-center cursor-pointer"
                        onClick={() => handleTextClick(itemPriceInputRef)}
                      >Item Sold Price</div>
                      <div>
                        <input
                        ref={itemPriceInputRef}
                        className="p-2 w-20 h-9 rounded-md text-xs font-semibold"
                        onChange={(e) => handleInputChange(e , "soldPrice")}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between m-2">
                    <div className="text-xs flex justify-center items-center cursor-pointer"
                         onClick={() => handleTextClick(itemCostInputRef)}
                    >Item Cost</div>
                      <div>
                        <input
                        ref={itemCostInputRef}
                        className="p-2 w-20 h-9 rounded-md text-xs font-semibold"
                        onChange={(e) => handleInputChange(e , "itemCost")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className='flex flex-col w-full sm:w-[50%]'>
                  <div className="bg-gray-200 rounded-md m-2 p-2">
    
                    <div className="flex justify-between m-2">
                    <div className="text-xs flex justify-center items-center cursor-pointer"
                         onClick={() => handleTextClick(shippingChargeInputRef)}>Shipping Charge</div>
                      <div>
                        <input 
                          ref={shippingChargeInputRef}
                          className="p-2 w-20 h-9 rounded-md text-xs font-semibold"
                          onChange={(e) => handleInputChange(e , "shippingCharge")}
                        />
                      </div>
                    </div>
    
                    <div className="flex justify-between m-2">
                    <div className="text-xs flex justify-center items-center cursor-pointer"
                         onClick={() => handleTextClick(shippingCostInputRef)}>Shipping Cost</div>
                      <div>
                        <input 
                        ref={shippingCostInputRef}
                        className="p-2 w-20 h-9 rounded-md text-xs font-semibold"
                        onChange={(e) => handleInputChange(e , "shippingCost")}
                        />
                      </div>
                    </div>
    
                  </div>
                </div>
            </div>
  
        <Options />
  
        <div className="flex justify-center items-center text-white m-2">Estimated Results</div>
  
        <Consequences />
  

      </div>
    </div>
  );
  
}

export default App;
