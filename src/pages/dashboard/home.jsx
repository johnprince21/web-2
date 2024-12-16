import React, { useEffect, useState } from 'react';
import '../../index.css';
import axios from 'axios';
import steps from '../../assets/steps.png';
import cycling from '../../assets/cycling.png';
import calories from '../../assets/calories.png';
import water from '../../assets/water.png';
import sleep from '../../assets/sleeping.png';
import BarChart from './activityChart';
import DoughnutChart from './progressChart';

const activityTypes = [
    { name: 'Steps', icon: steps, bgColor: '#1EB1B1', goalKey: 'walkingGoal', currentKey: 'walkingCurrentValue' },
    { name: 'Cycling', icon: cycling, bgColor: '#FE7646', goalKey: 'cyclingGoal', currentKey: 'cyclingCurrentValue' },
    { name: 'Calories', icon: calories, bgColor: '#F56081', goalKey: 'CaloriesGoal', currentKey: 'CaloriesCurrentValue' },
    { name: 'Water', icon: water, bgColor: '#867AFC', goalKey: 'waterGoal', currentKey: 'waterCurrentValue' },
    { name: 'Sleep', icon: sleep, bgColor: '#FFD057', goalKey: 'sleepingGoal', currentKey: 'sleepingCurrentValue' },
];

function Home() {
    const [activityData, setActivityData] = useState({});
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const calculateOffset = (percentage) => circumference - (percentage / 100) * circumference;

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://health-and-wellness-app-back-end.onrender.com/goaltrackers/view', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setActivityData(response.data.data[0]);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <section className="bg-white p-4 rounded shadow">
                <p className="text-gray-700 text-2xl pt-2 pb-5 font-semibold">Welcome user</p>
                <div className="flex flex-wrap gap-5 justify-center items-center">
                    {activityTypes.map(({ name, icon, bgColor, goalKey, currentKey }) => {
                        const goal = activityData[goalKey] || 0;
                        const percentage = goal ? Math.round((activityData[currentKey] / goal) * 100) : 0;
                        return (
                            <div key={name} className="dataBox" style={{ backgroundColor: bgColor }}>
                                <div className="flex gap-2">
                                    <img src={icon} alt={`${name} Icon`} className="h-7" />
                                    <p>{name}</p>
                                </div>
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r={radius} stroke="#d1d5db" strokeWidth="10" fill="none" />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            stroke="#ffffff"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={calculateOffset(percentage)}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <p className="text-white text-lg font-semibold">{percentage} %</p>
                                </div>
                                <div className="text-sm">{goal}</div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section>
                <div className="flex gap-4 justify-around my-5 flex-wrap">
                    <div className="w-[95%] sm:w-[75%] lg:w-[60%] bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-gray-700 text-xl pt-2 pb-5 font-semibold">Activity</h2>
                            <p className="text-gray-400">Weekly</p>
                        </div>
                        <BarChart />
                    </div>
                    <div className="w-[90%] sm:w-[75%] lg:w-[35%] bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-gray-700 text-xl pt-2 pb-5 font-semibold">Progress</h2>
                            <p className="text-gray-400">Weekly</p>
                        </div>
                        <DoughnutChart />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
