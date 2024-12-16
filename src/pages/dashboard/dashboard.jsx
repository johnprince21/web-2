import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';
import hamburger from '../../assets/icons8.png';
import home from '../../assets/home.png';
import profile from '../../assets/profile.png';
import logout from '../../assets/logout.png';
import bubblerun from '../../assets/bubble-running.png';
import bubblesleep from '../../assets/bubble-sleep.png';
import bubblefire from '../../assets/bubble-fire.png';
import nutrition from '../../assets/nutrition.png';
import exercise from '../../assets/exercise.png';
import goal from '../../assets/goal.png';
import Home from './home';
import Profile from './profile';
import Nutritiongoal from './nutritiongoal';
import ExerciseModel from './exerciseModel';
import Goal from './goal';

function Dashboard() {


    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [goalTrack, setGoalTrack] = useState('');
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


    // Set the active section on click
    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    // Handle logout: Clear token and navigate to login
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser('');
        navigate('/'); // Adjust this path based on your routes
    };

    // user data is fetched from a database
    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            handleLogout();
            return;
        }

        // Fetch user data using token
        axios.get('https://health-and-wellness-app-back-end.onrender.com/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Set user data and loading state to false
                setUser(response.data);
                console.log('setUser', response.data)
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired or unauthorized
                    handleLogout();
                } else {
                    setError('Error fetching user data');
                    console.error(error);
                }
            });
    }, []);


    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        //Fetch data from goals and Tracks
        axios.get('https://health-and-wellness-app-back-end.onrender.com/goaltrackers/view', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setGoalTrack(response.data.data[0]);
            })
            .catch((error) => {
                setError('Error fetching goal track data');
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="flex min-h-screen max-h-fit bg-gray-100 font-sans ">
                {/* <!-- Sidebar --> */}
                <aside className={`${isSidebarOpen ? 'w-18 md:w-48 lg:w-56' : 'w-18'} fixed top-0 left-0 h-full bg-gray-200 text-white flex flex-col`}>
                    <div className="p-4 justify-between items-center text-2xl font-semibold border-b border-gray-700 flex">
                        <p className={`text-2xl sm:text-3xl text-primary ${isSidebarOpen ? 'block' : 'hidden'}`}>H<span className='text-sm'>&</span>W</p>
                        <img src={hamburger} alt="hamburger" onClick={toggleSidebar} className='h-6 sm:h-8' />
                    </div>

                    <nav className="flex-1 p-4">
                        <ul className="space-y-4">
                            <li className='flex  items-center gap-2 sm:gap-5 text-md md:text-lg text-primary' onClick={() => handleSectionClick('home')}>
                                <img src={home} alt="404" className={`h-6 sm:h-8 my-3`} />
                                <a href="#home" className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Home</a>
                            </li>
                            <li className='flex  items-center gap-2 sm:gap-5 text-md md:text-lg text-primary' onClick={() => handleSectionClick('profile')}>
                                <img src={profile} alt="404" className={`h-6 sm:h-8 my-3`} />
                                <a href="#profile" className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Profile</a>
                            </li>
                            <li className='flex  items-center gap-2 sm:gap-5 text-md md:text-lg text-primary' onClick={() => handleSectionClick('nutritiongoal')}>
                                <img src={nutrition} alt="404" className={`h-6 sm:h-8 my-3`} />
                                <a href="#nutritiongoal" className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Nutrition Goal</a>
                            </li>
                            <li className='flex  items-center gap-2 sm:gap-5 text-md md:text-lg text-primary' onClick={() => handleSectionClick('exercisemodel')}>
                                <img src={exercise} alt="404" className={`h-7 sm:h-8 my-3`} />
                                <a href="#exercisemodel" className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Exercise Model</a>
                            </li>
                            <li className='flex  items-center gap-2 sm:gap-5 text-md md:text-lg text-primary' onClick={() => handleSectionClick('goal')}>
                                <img src={goal} alt="404" className={`h-6 sm:h-8 my-3`} />
                                <a href="#goal" className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Goal & Tracking</a>
                            </li>
                            <li className='flex  items-center gap-2 sm:gap-5 text-md md:text-lg text-primary' onClick={handleLogout}>
                                <img src={logout} alt="404" className={`h-6 sm:h-8 my-3`} />
                                <a href="#logout" className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Logout</a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* <!-- Main Content Area --> */}
                <div className={`${isSidebarOpen ? 'w-[30%] md:w-48 lg:w-56' : 'w-[12%] sm:w-[8.5%] md:w-[6.6%] lg:w-[4.3%]'}`}></div>
                <div className={`flex-1 flex flex-col`}>
                    {/* <!-- Header --> */}
                    <header className="bg-white shadow p-4">
                        <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
                    </header>

                    {/* <!-- Main Content --> */}
                    <div className='flex flex-col md:flex-row h-[100%]'>
                        <main className="flex-1 p-6 bg-gray-100">
                            {activeSection === 'home' && (
                                <><Home /></>
                            )}

                            {activeSection === 'profile' && (
                                <><Profile /></>
                            )}

                            {activeSection === 'nutritiongoal' && (
                                <><Nutritiongoal /></>
                            )}
                            {activeSection === 'exercisemodel' && (
                                <><ExerciseModel /></>
                            )}
                            {activeSection === 'goal' && (
                                <><Goal /></>
                            )}
                        </main>
                        <main className='p-6 bg-gray-50 w-full md:w-[23%]'>
                            <div className='my-4 text-2xl'>User Name</div>
                            <div className='w-full border rounded-lg px-3 py-5 bg-white flex flex-wrap gap-2 justify-evenly items-center text-gray-400'>
                                <div className='text-center'>
                                    <p><span className='text-black text-3xl'>{user?.data?.weight ?? 'N/A'} </span>kg</p>
                                    <p>Weight</p>
                                </div>
                                <div className='text-center'>
                                    <p><span className='text-black text-3xl'>{user?.data?.height ?? 'N/A'}</span>mm</p>
                                    <p>Height</p>
                                </div>
                                <div className='text-center'>
                                    <p><span className='text-black text-3xl'>{user?.data?.age ?? 'N/A'}</span>yrs</p>
                                    <p>Age</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-xl mt-10 mb-5'>Your Goals</p>
                                <div className='flex flex-wrap flex-col gap-y-4'>
                                    <div className='goals'>
                                        <img src={bubblerun} alt="404" className='h-14' />
                                        <div className='text-center'>
                                            <p>Running</p>
                                            <p className='text-gray-400'>{goalTrack?.RunningGoal ?? 'N/A'} / {goalTrack?.RunningCurrentValue ?? 'N/A'}</p>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className='goals'>
                                        <img src={bubblesleep} alt="404" className='h-14' />
                                        <div className='text-center'>
                                            <p>Sleeping</p>
                                            <p className='text-gray-400'>{goalTrack?.sleepingGoal ?? 'N/A'} / {goalTrack?.sleepingCurrentValue ?? 'N/A'}</p>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className='goals'>
                                        <img src={bubblefire} alt="404" className='h-14' />
                                        <div className='text-center'>
                                            <p>Wight Loss</p>
                                            <p className='text-gray-400'>{goalTrack?.weightlossGoal ?? 'N/A'} / {goalTrack?.weightlossCurrentValue ?? 'N/A'}</p>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>

                    {/* <!-- Footer --> */}
                    <footer className="bg-gray-200 text-primary p-4 text-center">
                        &copy; 2024 Your Company
                    </footer>
                </div>
            </div >
        </>
    )
}

export default Dashboard