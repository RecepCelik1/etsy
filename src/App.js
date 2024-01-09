

function App() {
  return (
    <div className="bg-[#282c34] h-full flex justify-center">
      <div className="w-3/6 h-full bg-slate-500 flex flex-col items-center mb-12">
        <div className="price w-full mt-36 flex justify-between">

            <div className="w-4/5 flex flex-col items-center bg-slate-300 mr-2 ml-2">
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12 w-full">Item Sold Price</span>
                  <input type="text" className="w-16 ml-12"></input>
              </div>
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12">Item Cost</span>
                  <input type="text" className="w-16 ml-12"></input>
              </div>
            </div>

            <div className="w-4/5 flex flex-col items-center bg-slate-300 mr-2 ml-2">
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12">Shipping Charge</span>
                  <input type="text" className="w-16 ml-12"></input>
              </div>
              <div className="flex justify-between mt-3 mb-3">
                  <span className="mr-12">Shipping Cost</span>
                  <input type="text" className="w-16 ml-12"></input>
              </div>
            </div>

        </div>
        
        <div className="mt-4 w-full flex justify-center">

          <div className="flex flex-col items-start w-1/3 bg-slate-300 ml-2">
            <div>Seller Location</div>
            <div>Shop Currency is Different</div>
            <div>International Sale</div>
            <div>Using Offsite Ads</div>
          </div>

          <div className="flex justify-center w-1/3 bg-slate-300">
            <div className="vertical-line h-full border-r border-black "></div>
          </div>

          <div className="flex flex-col w-1/3 bg-slate-300 mr-2">
            <div>Sales Tax</div>
            <div>Other Cost</div>
          </div>

        </div>

        <div className="mt-4 flex justify-center">
          Estimated Results
        </div>
        
        <div className="mt-4 flex w-full justify-center">
          <div className="mt-2 mb-2 w-full ml-2 h-full bg-slate-300 flex items-center">Total Profit Per Item</div>
          <div className="mt-2 mb-2 w-full mr-2 h-full flex justify-end bg-slate-300 items-center">-$ 0.45</div>
        </div>

        <div className="mt-4 w-full">
          <div className="ml-2 flex flex-col justify-start bg-slate-300">
            <div className=" flex justify-between mt-2 mb-2">
              <div>Profit Margin <p>Total Profit / Total Revenue</p></div>
              <div className="flex items-center">0.00%</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Return on Cost <p>Total Profit / Item Cost</p></div>
              <div className="flex items-center">0.00%</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div className="font-bold">Breakeven Price</div>
              <div className="flex items-center">$0.00</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>

            <div className=" flex justify-between mt-2 mb-2">
              <div className="font-bold">Total Fees</div>
              <div className="flex items-center">$0.00</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Average Fee Rate<p>Total Fees / Total Revenue</p></div>
              <div className="flex items-center">0.00%</div>
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

        <div className="w-full b-slate-300 flex flex-col bg-slate-300">
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Revenue</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Listing Fee</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Transaction Fee</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Etsy Payment Fee</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Offsite Add Fee</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Fees</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Cost</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
            <div className="vertical-line w-full border-t border-black "></div>
            <div className=" flex justify-between mt-2 mb-2">
              <div>Total Profit</div>
              <div className="flex items-center">$ 0.00</div>
            </div>
        </div>
        <span className="flex justify-center bg-black m-2 rounded-xl cursor-pointer">
          <span className="text-white ml-2 mr-2"> Reset Calculator</span>
        </span>
      </div>
    </div>
  );
}

export default App;
