import { useRef, useState } from 'react';
import Select from 'react-select';
import { countryFunc } from '../redux/countrySlice';
import { useDispatch , useSelector } from 'react-redux';
import { boolToggleFunc , underOrOver10kUsdFunc , salesTaxFunc , otherCostFunc , UkVatRateFunc , FeeVatRateFunc , ukCostsFunc } from '../redux/toggleSlice';

const Options = () => {

    
    const dispatch = useDispatch()

    const selectedCurrency = useSelector(state => state.country.country)

    const parsingFunction = (event , field) => {
      const filteredValue = event.target.value.replace(/[^0-9,.]/g, "");
      const parsedValue = parseFloat(filteredValue.replace(",", "."));
      if(field === "taxField"){
        dispatch(salesTaxFunc(parsedValue))
      }
      if(field === "costsField"){
        dispatch(otherCostFunc(parsedValue))
      }
      if(field === "UkVatRateFunc") {
        dispatch(UkVatRateFunc(parsedValue))
      }
      if(field === "FeeVatRate") {
        dispatch(FeeVatRateFunc(parsedValue))
      }
      if(field === "ukCosts") {
        dispatch(ukCostsFunc(parsedValue))
      }
    }


    const salesTaxRef = useRef(null)
    const vatOnRevenueRef = useRef(null)
    const vatOnFeeRef = useRef(null)

    const handleTextClick = (inputRef) => {

        if (inputRef.current) {
          inputRef.current.focus();
        }      
  
      };

    const countries = [
        { value: 'US', label: 'United States', flag: '🇺🇸' },
        { value: 'UK', label: 'United Kingdom', flag: 'UK' },
      ];

      const customStyles = { //=> for dropdown menu customize
        option: (provided, state) => ({
          ...provided, 
          color: state.isSelected ? 'white' : 'black',
          background: state.isSelected ? '#0285c7' : state.isFocused ? '#38bdf8' : 'white',
          fontSize : '12px',
        }),
        control: (provided) => ({
          ...provided,
          width: '100%',
          minHeight: "32.5px",
          height : '32.5px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize : "12px",
          maxHeight: '12px',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: '8px',
            overflowY: 'auto',
            
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            fontSize: '12px', 
            backgroundColor: state.isFocused ? '#e6f7ff' : 'white', // 
            borderRadius: '8px',
            
        }),
          dropdownIndicator: (provided, state) => ({
            alignItems: 'items-center',
            justifyContent: 'center',
            marginRight : "5px",
            marginTop : "1px"
          }),
      };
    




      const differentCurrencyisOn = useSelector(state => state.toggle.differentCurrency)
      const internationalSaleisOn = useSelector(state => state.toggle.internationalSale)
      const offSiteAddisOn = useSelector(state => state.toggle.offSiteAds)
      const taxisOn = useSelector(state => state.toggle.salesTaxBool)
      const otherCostsisOn = useSelector(state => state.toggle.otherCostBool)

      const UkVat = useSelector(state => state.toggle.UkVat) //bool
      const UkVatRate = useSelector(state => state.toggle.UkVatRate)
      const UkVatInclusive = useSelector(state => state.toggle.UkVatInclusive) //bool
      const VatOnFees = useSelector(state => state.toggle.VatOnFees) //bool
      const vatFeeRate = useSelector(state => state.toggle.vatFeeRate) 
      const ukCostBool = useSelector(state => state.toggle.ukCostBool) 
      const ukCosts = useSelector(state => state.toggle.ukCosts) 



      const toggleSwitch = (event , field) => {
            dispatch(boolToggleFunc(field))
      };

       //const UsdAdds = useSelector(state => state.toggle.underOrOver10kUsd)
       const TaxRate = useSelector(state => state.toggle.salesTax)
       const CostValue = useSelector(state => state.toggle.otherCost)
      


      const [under10KUSD, setunder10KUSD] = useState(null);

      const underOrBelow = [
        { value: 15, label: 'Under $10.000 USD'},
        { value: 12, label: 'Over $10.000 USD'},
      ];

      

      return (
        <div className="flex flex-col sm:flex-row justify-center bg-gray-200 m-2 rounded-md p-3">
        
          <div className='flex flex-col w-full m-1'>
            
            <div className='flex justify-between'>
            <div className='flex items-center justify-center text-xs'>Seller Location</div>
              <div className='w-32'>
                <Select
                  className=''
                  options={countries}
                  styles={customStyles}
                  value={selectedCurrency}
                  onChange={(selectedOption) => {
                  dispatch(countryFunc(selectedOption));
                  }}
                  placeholder="Select currency..."
                  isSearchable
                />
              </div>
            </div>
      
            <div className='flex justify-between mt-1'>
              <div className='flex items-center text-xs'>Shop Currency is Different</div>
              <div>
                <button
                  onClick={(e) => toggleSwitch(e, "isCurrency")}
                  className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                    differentCurrencyisOn? 'bg-sky-600' : 'bg-gray-400'
                } text-white px-1 py-1 rounded-full`}
                >
              <span
                className={`${
                differentCurrencyisOn ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px]  flex justify-center items-center font-bold ease-in-out`}
                >{differentCurrencyisOn ? "YES" : "NO"}</span>
              </button>
              </div>
            </div>
      

            <div className='flex justify-between mt-1'>
              <div className='flex items-center text-xs'>International Sale</div>
              <div className="flex items-center">
                <button
                  onClick={(e) => toggleSwitch(e, "isInternational")}
                  className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                    internationalSaleisOn? 'bg-sky-600' : 'bg-gray-400'
                } text-white px-1 py-1 rounded-full`}
                >
              <span
                className={`${
                internationalSaleisOn ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px]  flex justify-center items-center font-bold ease-in-out`}
                >{internationalSaleisOn ? "YES" : "NO"}</span>
                </button>
              </div>
            </div>
      

            <div className='flex flex-col mt-1'>
              <div className='flex justify-between'>
                <div className='flex items-center text-xs'>Using Offsite Ads</div>
                <div>
                  <button
                    onClick={(e) => toggleSwitch(e, "OffSiteAdds")}
                    className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                      offSiteAddisOn? 'bg-sky-600' : 'bg-gray-400'
                  } text-white px-1 py-1 rounded-full`}
                  >
                  <span
                  className={`${
                  offSiteAddisOn ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                  } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px]  flex justify-center items-center font-bold ease-in-out`}
                  >{offSiteAddisOn ? "YES" : "NO"}</span>
                  </button>
                </div>
              </div>
      

              <div className={`transition-all duration-[500ms] ease-in-out ${offSiteAddisOn ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <div className='flex justify-between mt-1'>
                  <div className='flex justify-center items-center text-xs'>Sales in Past 365 Days</div>
                  <div className='w-32'>
                    <Select
                      className=''
                      options={underOrBelow}
                      styles={customStyles}
                      value={under10KUSD}
                      onChange={(selectedOption) => {
                        setunder10KUSD(selectedOption);
                        dispatch(underOrOver10kUsdFunc(selectedOption.value))
                      }}
                      isSearchable
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* Vertical Line */}
          <div className='border-gray-400 border m-1'></div>
      

          {selectedCurrency.value === "US" && (
                <div className='flex flex-col m-1 w-full'>
              

              <div className='flex flex-col w-full'>
                <div className='flex justify-between w-full'>
                  <div className='flex justify-center items-center text-xs'>Sales Tax</div>
                  <div>
                    <button
                      onClick={(e) => toggleSwitch(e, "isTax")}
                      className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                        taxisOn ? 'bg-sky-600 ' : 'bg-gray-400'
                    } text-white px-1 py-1 rounded-full`}
                    >
                      <span
                        className={`${
                        taxisOn ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                          } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px]  flex justify-center items-center font-bold ease-in-out`}
                        >{taxisOn ? "YES" : "NO"}</span>
                      </button>
                  </div>
                </div>
                
                <div className={`transition-all duration-[500ms] ease-in-out ${taxisOn ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>

                  <div className='flex justify-between mt-1 relative'>
                    <div className='flex justify-center items-center text-xs cursor-pointer' 
                    onClick={() => handleTextClick(salesTaxRef)}
                    >Enter Percentage</div>
                    <input 
                    className="p-2 w-16 h-7 rounded-md text-xs font-bold" 
                    onChange={e => parsingFunction(e, "taxField")} 
                    value={TaxRate === 0 ? "" : TaxRate}
                    ref={salesTaxRef}
                    />
                    <span className='absolute top-[25%] right-2 text-xs font-bold'>%</span>
                  </div>

                </div>

              </div>
              

              <div className='flex flex-col mt-1'>
                <div className='flex justify-between'>
                  <div className='flex items-center justify-center text-xs'>Other Cost</div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => toggleSwitch(e, "isCost")}
                      className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                        otherCostsisOn ? 'bg-sky-600' : 'bg-gray-400'
                    } text-white px-1 py-1 rounded-full`}
                    >
                       <span
                        className={`${
                            otherCostsisOn ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                            } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px] flex justify-center items-center font-bold ease-in-out`}
                        >{otherCostsisOn ? "YES" : "NO"}</span>
                    </button>
                  </div>
                </div>
                

                <div className={`flex flex-col transition-all duration-500 ease-in-out ${otherCostsisOn ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  
                  <div className='mt-1'>
                    <input className="p-2 w-full rounded-md h-7 text-xs flex justify-center items-center font-semibold" placeholder='Enter other costs'
                    onChange={e => parsingFunction(e, "costsField")} value={CostValue === 0 ? "" : CostValue}
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
                    
          {/* UK area */}
          {selectedCurrency.value === "UK" && (
            <div className="flex flex-col w-full m-1">
      
              <div className='flex flex-col'>
                <div className='flex justify-between'>
                  <div className='flex justify-center items-center text-xs'>Vat on Revenue</div>
                  <div>
                    <button
                      onClick={(e) => toggleSwitch(e, "UkVat")}
                      className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                        UkVat ? 'bg-sky-600' : 'bg-gray-400'
                    } text-white px-1 py-1 rounded-full`}
                    >
                        <span
                        className={`${
                            UkVat ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                            } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px] flex justify-center items-center font-bold ease-in-out`}
                        >{UkVat ? "YES" : "NO"}</span>
                    </button>
                  </div>
                </div>
                

                <div className={`flex flex-col transition-all duration-500 ease-in-out ${UkVat ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>

                  <div className='flex flex-col mt-1'>
                    <div className='flex justify-between'>
                    <div className='flex justify-center items-center text-xs cursor-pointer' onClick={() => handleTextClick(vatOnRevenueRef)}>Enter Percentage</div>
                    <div className='relative'>
                      <input 
                      className="p-2 w-16 h-7 rounded-md text-xs font-bold"
                      onChange={e => parsingFunction(e, "UkVatRateFunc")}
                      ref={vatOnRevenueRef}
                      />
                      <span className='absolute top-[25%] right-2 text-xs font-bold'>%</span>
                    </div>
                    </div>
      
                    <div className="flex justify-between mt-1">
                      <div className='flex justify-center items-center text-xs'>Revenue Inclusive of VAT</div>
                      <div>
                      <button
                        onClick={(e) => toggleSwitch(e, "UkVatInclusive")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          UkVatInclusive ? 'bg-sky-600' : 'bg-gray-400'
                      } text-white px-1 py-1 rounded-full`}
                      >
                        <span
                        className={`${
                            UkVatInclusive ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                            } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px] flex justify-center items-center font-bold ease-in-out`}
                        >{UkVatInclusive ? "YES" : "NO"}</span>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
      

                <div className='flex justify-between mt-1'>
                  <div className='flex justify-center items-center text-xs'>VAT on Fees</div>
                  <div>
                    <button
                      onClick={(e) => toggleSwitch(e, "VatOnFees")}
                      className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                        VatOnFees ? 'bg-sky-600' : 'bg-gray-400'
                    } text-white px-1 py-1 rounded-full`}
                    >
                    <span
                      className={`${
                      VatOnFees ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                      } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px] flex justify-center items-center font-bold ease-in-out`}
                      >{VatOnFees ? "YES" : "NO"}</span>
                    </button>
                  </div>
                </div>
      

                <div className={`flex flex-col transition-all duration-500 ease-in-out ${VatOnFees ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  
                  <div className='flex justify-between mt-1'>
                    <div 
                    className='flex justify-center items-center text-xs cursor-pointer'
                    onClick={() => handleTextClick(vatOnFeeRef)}
                    >Enter Percentage</div>
                    <div className='relative'>
                    <input
                    ref={vatOnFeeRef}
                    className="p-2 w-16 h-7 rounded-md text-xs font-bold" 
                    onChange={e => parsingFunction(e, "FeeVatRate")}/>
                    <span className='absolute top-[25%] right-2 text-xs font-bold'>%</span>
                    </div>
                  </div>
                </div>
              </div>
      

              <div className='flex flex-col mt-1'>
                <div className='flex justify-between'>
                  <div className='flex justify-center items-center text-xs'>Other Cost</div>
                  <div>
                    <button
                      onClick={(e) => toggleSwitch(e, "ukCostBool")}
                      className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                        ukCostBool ? 'bg-sky-600' : 'bg-gray-400'
                    } text-white px-1 py-1 rounded-full`}
                    >
                    <span
                      className={`${
                      ukCostBool ? 'translate-x-full text-sky-600' : 'translate-x-0 text-gray-500'
                      } inline-block w-5 h-5 bg-white rounded-full transform duration-300 transition-transform text-[8px] flex justify-center items-center font-bold ease-in-out`}
                      >{ukCostBool ? "YES" : "NO"}</span>
                    </button>
                  </div>
                </div>
                
                <div className={`flex flex-col transition-all duration-500 ease-in-out ${ukCostBool ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <div className='mt-1'>
                    <input 
                    className="p-2 w-full rounded-md h-7 text-xs flex justify-center items-center font-semibold" placeholder='Enter other costs'
                    onChange={e => parsingFunction(e, "ukCosts")} 
                    />
                  </div>
                </div>  

              </div>
            </div>
          )}
        </div>
      );
      
      
} 

export default Options