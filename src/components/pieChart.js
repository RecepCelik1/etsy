import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Kategori 1', 'Kategori 2', 'Kategori 3'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="w-64 h-64">
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;
