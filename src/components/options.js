import { useState } from 'react';
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


    const countries = [
        { value: 'US', label: 'US dollar', flag: '🇺🇸' },
        { value: 'UK', label: 'GBP', flag: 'UK' },
      ];

      const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid #ccc',
          color: state.isSelected ? 'white' : 'black',
          background: state.isSelected ? '#007BFF' : state.isFocused ? '#16330014' : 'white',
          padding: 10,
        }),
        control: (provided) => ({
          ...provided,
          width: '80%',
          height: '24px',
          border: '1px solid black',
          borderRadius: '0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '10px',
          marginLeft: ''
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

       const UsdAdds = useSelector(state => state.toggle.underOrOver10kUsd)
       const TaxRate = useSelector(state => state.toggle.salesTax)
       const CostValue = useSelector(state => state.toggle.otherCost)
      


      const [under10KUSD, setunder10KUSD] = useState(null);

      const underOrBelow = [
        { value: 15, label: 'Under $10.000 USD'},
        { value: 12, label: 'Over $10.000 USD'},
      ];

      

      return (
        <div className="mt-4 w-full flex justify-center">
      
          <div className="flex flex-col items-start w-full bg-slate-300 ml-2">
           
            <div className='flex justify-between mt-2 mb-4'>
              <div className='mr-4 flex items-center'>Seller Location</div>
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
      

            <div className='flex justify-between'>
              <div className='flex items-center mr-4'>Shop Currency is Different</div>
              <div className="flex items-center">
                <button
                  onClick={(e) => toggleSwitch(e, "isCurrency")}
                  className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                    differentCurrencyisOn ? 'bg-green-500' : 'bg-red-500'
                  } text-white px-2 py-1 rounded-full`}
                >
                  <span
                    className={`${
                      differentCurrencyisOn ? 'translate-x-full' : 'translate-x-0'
                    } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                  />
                </button>
              </div>
            </div>
      
            <div className='flex justify-between mt-2 mb-2'>
              <div className='flex items-center mr-4'>International Sale</div>
              <div className="flex items-center">
                <button
                  onClick={(e) => toggleSwitch(e, "isInternational")}
                  className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                    internationalSaleisOn ? 'bg-green-500' : 'bg-red-500'
                  } text-white px-2 py-1 rounded-full`}
                >
                  <span
                    className={`${
                      internationalSaleisOn ? 'translate-x-full' : 'translate-x-0'
                    } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                  />
                </button>
              </div>
            </div>
      
            <div className='flex flex-col items-center mt-2 mb-2'>
           
              <div className='flex justify-between mt-2 mb-2'>
                <div className='flex items-center mr-4'>Using Offsite Ads</div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => toggleSwitch(e, "OffSiteAdds")}
                    className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                      offSiteAddisOn ? 'bg-green-500' : 'bg-red-500'
                    } text-white px-2 py-1 rounded-full`}
                  >
                    <span
                      className={`${
                        offSiteAddisOn ? 'translate-x-full' : 'translate-x-0'
                      } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                    />
                  </button>
                </div>
              </div>
      
        
              {offSiteAddisOn && (
                <div className='flex justify-center'>
                  <div className='mr-'>Sales in Past 365 Days</div>
                  <div>
                    <Select
                      className=''
                      options={underOrBelow}
                      styles={customStyles}
                      value={under10KUSD}
                      onChange={(selectedOption) => {
                        setunder10KUSD(selectedOption);
                        dispatch(underOrOver10kUsdFunc(selectedOption.value))
                      }}
                      placeholder="Under"
                      isSearchable
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
      
        
          <div className="flex justify-center bg-slate-300">
            <div className="vertical-line h-full border-r border-black "></div>
          </div>
      


            {selectedCurrency.value === "US" && (
              <div className="flex flex-col w-full bg-slate-300 mr-2">
          
             
                <div className='flex flex-col mt-2 mb-2'>
                  <div className='flex justify-between'>
                    <div>Sales Tax</div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => toggleSwitch(e, "isTax")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          taxisOn ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-2 py-1 rounded-full`}
                      >
                        <span
                          className={`${
                            taxisOn ? 'translate-x-full' : 'translate-x-0'
                          } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
          
               
                  {taxisOn && (
                    <div className='flex justify-between mt-2 relative'>
                      <label>Enter Percentage</label>
                      <input className='w-[64px]' onChange={e => parsingFunction(e, "taxField")} value={TaxRate === 0 ? "" : TaxRate}></input>
                      <span className='absolute right-0'>%</span>
                    </div>
                  )}
                </div>
          
         
                <div className='flex flex-col mt-2 mb-2'>
                  <div className='flex justify-between'>
                    <div>Other Cost</div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => toggleSwitch(e, "isCost")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          otherCostsisOn ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-2 py-1 rounded-full`}
                      >
                        <span
                          className={`${
                            otherCostsisOn ? 'translate-x-full' : 'translate-x-0'
                          } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
          
               
                  {otherCostsisOn && (
                    <div className='flex justify-between mt-2 '>
                      <input className='w-full mr-2 ml-2 h-8 p-2' placeholder='Enter other costs'
                        onChange={e => parsingFunction(e, "costsField")} value={CostValue === 0 ? "" : CostValue}
                      />
                    </div>
                  )}
                </div>
              </div>)}
              
              {/* UK alanı */}

              {selectedCurrency.value === "UK" && (
                
                <div className="flex flex-col w-full bg-slate-300 mr-2">

<div className='flex flex-col mt-2 mb-2'>

                  <div className='flex justify-between'>
                    <div>Vat on Revenue</div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => toggleSwitch(e, "UkVat")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          UkVat ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-2 py-1 rounded-full`}
                      >
                        <span
                          className={`${
                            UkVat ? 'translate-x-full' : 'translate-x-0'
                          } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
          
                  
                  {UkVat && (
                    
                    <div className='flex flex-col'>
                      <div className='flex justify-between mt-2 relative'>
                      <label>Enter Percentage</label>
                      <input className='w-[64px]' onChange={e => parsingFunction(e, "UkVatRateFunc")} value={isNaN(UkVatRate) ? "" : UkVatRate}></input>
                      <span className='absolute right-0'>%</span>
                      </div>

                      <div className="flex justify-between mt-3">
                        <div>Revenue Iclusive of VAT</div>
                      <button
                        onClick={(e) => toggleSwitch(e, "UkVatInclusive")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          UkVatInclusive ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-2 py-1 rounded-full`}
                      >
                        <span
                          className={`${
                            UkVatInclusive ? 'translate-x-full' : 'translate-x-0'
                          } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                        />
                      </button>

                    </div>
                    </div>
                  )}

                  <div className='flex justify-between mt-4'>
                    <div>VAT on Fees</div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => toggleSwitch(e, "VatOnFees")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          VatOnFees ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-2 py-1 rounded-full`}
                      >
                        <span
                          className={`${
                            VatOnFees ? 'translate-x-full' : 'translate-x-0'
                          } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                        />
                      </button>
                    </div>
                  </div>

                  {VatOnFees && (
                    <div className='flex justify-between mt-2 relative'>
                    <label>Enter Percentage</label>
                    <input className='w-[64px]' onChange={e => parsingFunction(e, "FeeVatRate")} value={isNaN(vatFeeRate) ? "" : vatFeeRate}></input>
                    <span className='absolute right-0'>%</span>
                    </div>
                  )}

                </div>

                <div className='flex flex-col mt-2 mb-2'>
                  <div className='flex justify-between'>
                    <div>Other Cost</div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => toggleSwitch(e, "ukCostBool")}
                        className={`relative inline-flex items-center cursor-pointer focus:outline-none w-12 ${
                          ukCostBool ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-2 py-1 rounded-full`}
                      >
                        <span
                          className={`${
                            ukCostBool ? 'translate-x-full' : 'translate-x-0'
                          } inline-block w-4 h-4 mt-1 mb-1 bg-white rounded-full transform transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
          
               
                  {ukCostBool && (
                    <div className='flex justify-between mt-2 '>
                      <input className='w-full mr-2 ml-2 h-8 p-2' placeholder='Enter other costs'
                        onChange={e => parsingFunction(e, "ukCosts")} value={isNaN(ukCosts) ? "" : ukCosts}
                      />
                    </div>
                  )}
                </div>

              </div>

              )}
              

        </div>
      );
      
} 

export default Options