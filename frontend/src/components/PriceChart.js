import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = ({ priceHistory, productName }) => {
  const data = {
    labels: priceHistory.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Price History',
        data: priceHistory.map(item => item.price),
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Average Price',
        data: priceHistory.map(() => {
          const avg = priceHistory.reduce((acc, curr) => acc + curr.price, 0) / priceHistory.length;
          return avg;
        }),
        borderColor: '#ef4444',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Price History for ${productName}`,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Line data={data} options={options} />
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-gray-600">Lowest Price</p>
          <p className="text-xl font-semibold text-blue-600">
            ${Math.min(...priceHistory.map(item => item.price)).toFixed(2)}
          </p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-gray-600">Highest Price</p>
          <p className="text-xl font-semibold text-red-600">
            ${Math.max(...priceHistory.map(item => item.price)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart; 