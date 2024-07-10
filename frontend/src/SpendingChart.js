import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const SpendingChart = ({ data }) => {
  const categories = [...new Set(data.map(expense => expense.category))];
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: categories.map(category => 
          data.filter(expense => expense.category === category)
              .reduce((sum, expense) => sum + expense.price, 0)
        ),
        backgroundColor: [
          'rgba(232, 255, 183, 0.2)', // Tea green
          'rgba(226, 160, 255, 0.2)', // Mauve
          'rgba(196, 245, 252, 0.2)', // Light Cyan
          'rgba(183, 255, 216, 0.2)', // Aquamarine
        ],
        borderColor: [
          'rgba(232, 255, 183, 1)', // Tea green
          'rgba(226, 160, 255, 1)', // Mauve
          'rgba(196, 245, 252, 1)', // Light Cyan
          'rgba(183, 255, 216, 1)', // Aquamarine
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Spending Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default SpendingChart;
