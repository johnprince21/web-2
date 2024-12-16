import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

    const [goalTrack, setGoalTrack] = useState({
        RunningGoal: 0,
        cyclingGoal: 0,
        walkingGoal: 0,
        sleepingGoal: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://health-and-wellness-app-back-end.onrender.com/goaltrackers/view', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data && response.data.data.length > 0) {
                    setGoalTrack(response.data.data[0]);
                }
            })
            .catch((error) => {
                setError('Error fetching goal track data');
                console.error(error);
            });
    }, []);


    const data = {
        labels: ['Running', 'Cycling', 'Walking', 'Sleeping'],
        datasets: [
            {
                label: 'Progress',
                data: [
                    goalTrack.RunningGoal,
                    goalTrack.cyclingGoal,
                    goalTrack.walkingGoal / 1000,
                    goalTrack.sleepingGoal,
                ],
                backgroundColor: ['#4dd0e1', '#ff7043', '#ea80fc', '#ffca28'],
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} hrs`,
                },
            },
        },
        cutout: '70%', // Make it a ring shape
    };

    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
