// PieChart.js

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Önce mevcut grafiği yok et
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.colors,
          }],
        },
      });

      // Eski grafiği yok et
      chartInstance.destroy();
    }

    // Ardından yeni grafiği oluştur
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: data.colors,
        }],
      },
    });
  }, [data]);

  return <canvas ref={chartRef} width="400" height="400" />;
};

export default PieChart;
