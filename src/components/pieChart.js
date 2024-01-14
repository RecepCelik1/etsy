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

const PieChart = () => {
  const data = {
    labels : ['Yes' , 'No'],
    datasets : [{
      label : 'Poll',
      data : [ 3 , 6 ],
      backgroundColor : ['black' , 'red'],
      borderColor : ['black' , 'red'],
    }]
  }

  const options = {

  }

  return (
    <div className="App">
      <div className='flex w-48 h-48'>
      <Doughnut
        data = {data}
        options={options}
      ></Doughnut>
      </div>
     
    </div>
  );
};

export default PieChart;
