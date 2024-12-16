import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const BarChart = () => {


    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay(); // Get current day index (0 for Sun, 6 for Sat)

    const data = {
        labels: daysOfWeek,
        datasets: [
            {
                label: 'Activity',
                data: [20, 30, 40, 35, 50, 25, 30], // Example data
                backgroundColor: daysOfWeek.map((_, index) =>
                    index === todayIndex ? '#ff7043' : '#b3e5fc' // Highlight the current day
                ),
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw}%`, // Add percentage label to tooltip
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // Assume 100% as the max for consistency with percentage
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
