import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Goal() {

    const [user, setUser] = useState('');
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editTrackId, setEditTrackId] = useState(null);
    const navigate = useNavigate();


    const handleReload = () => {
        navigate(0);  // This will reload the current page
    };

    // State for form input
    const [formData, setFormData] = useState({
        RunningGoal: '',
        RunningCurrentValue: '',
        cyclingGoal: '',
        cyclingCurrentValue: '',
        sleepingGoal: '',
        sleepingCurrentValue: '',
        weightlossGoal: '',
        weightlossCurrentValue: '',
        walkingGoal: '',
        walkingCurrentValue: '',
        waterGoal: '',
        waterCurrentValue: '',
        CaloriesGoal: '',
        CaloriesCurrentValue: ''

    });

    // Goal data fetched from the database
    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        // Fetch Goal data using token
        axios.get('https://health-and-wellness-app-back-end.onrender.com/goaltrackers/view', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                setUser(response.data);
                setLoading(false); // Data fetched, stop loading
            })
            .catch(error => {
                setError(error);
                setLoading(false); // Stop loading on error
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        // e.preventDefault();  // Prevent form submission default behavior

        const token = localStorage.getItem('token');

        // If editGoalId is set, perform PATCH request; otherwise, add a new goal & track
        if (editTrackId) {
            // Edit existing goal
            axios.patch(`https://health-and-wellness-app-back-end.onrender.com/goaltrackers/${editTrackId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            data: prevState.data.map(track =>
                                track._id === editTrackId ? response.data : track
                            )
                        };
                    });
                    setShowPopup(false);
                    handleReload();
                    setEditTrackId(null); // Reset after editing

                })
                .catch(error => setError(error));
        } else {
            // Add new Goal & Track
            const newTrack = { ...formData, date: new Date() };
            axios.post('https://health-and-wellness-app-back-end.onrender.com/goaltrackers', newTrack, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUser(prevState => ({
                        ...prevState,
                        data: [...prevState.data, response.data]
                    }));
                    setShowPopup(false);
                    handleReload();
                })
                .catch(error => setError(error));
        }
    };

    const editTrack = (track) => {
        setEditTrackId(track._id);
        setFormData({
            RunningGoal: track.RunningGoal,
            RunningCurrentValue: track.RunningCurrentValue,
            cyclingGoal: track.cyclingGoal,
            cyclingCurrentValue: track.cyclingCurrentValue,
            sleepingGoal: track.sleepingGoal,
            sleepingCurrentValue: track.sleepingCurrentValue,
            weightlossGoal: track.weightlossGoal,
            weightlossCurrentValue: track.weightlossCurrentValue,
            walkingGoal: track.walkingGoal,
            walkingCurrentValue: track.walkingCurrentValue,
            waterGoal: track.waterGoal,
            waterCurrentValue: track.waterCurrentValue,
            CaloriesGoal: track.CaloriesGoal,
            CaloriesCurrentValue: track.CaloriesCurrentValue

        });
        setShowPopup(true);
    };

    const trackPopup = () => {
        setShowPopup(!showPopup);
        setEditTrackId(null);  // Reset edit ID when closing or reopening the popup
        setFormData({
            RunningGoal: '', RunningCurrentValue: '', cyclingGoal: '', cyclingCurrentValue: '',
            sleepingGoal: '', sleepingCurrentValue: '', weightlossGoal: '',
            weightlossCurrentValue: '', walkingGoal: '', walkingCurrentValue: '', waterGoal: '',
            waterCurrentValue: '', CaloriesGoal: '', CaloriesCurrentValue: '',
        });  // Clear form
    };


    if (error) {
        return <div>{error.message || error}</div>;  // Render error message
    }

    const handleDelete = (trackId) => {
        const token = localStorage.getItem('token');

        axios.delete(`https://health-and-wellness-app-back-end.onrender.com/goaltrackers/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(() => {
                // Refresh the user data by removing the deleted goal
                setUser(prevState => ({
                    ...prevState,
                    data: prevState.data.filter(track => track._id !== trackId)
                }));
            })
            .catch(error => setError(error));
    };

    return (
        <>
            <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-center'>Goal & Tracking</h1>

                <div className='max-h-96 overflow-x-auto'>
                    <div className='border py-2 px-3 mb-4 rounded ms-auto bg-primary-500 hover:bg-primary-700 focus:bg-primary-700 text-white font-semibold w-fit' onClick={trackPopup}>Add Goal & Tracking</div>
                    {loading ? (
                        <div className="flex justify-center items-center text-center py-4">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                            <p className="text-gray-700 text-sm mt-2">Loading...</p>
                        </div>
                    ) : (
                        <table className='min-w-full table-auto border-collapse border border-gray-300'>
                            <thead className='bg-gray-50'>
                                <tr >
                                    <th className='tablehead'>Running&nbsp;Goal&nbsp;(km)</th>
                                    <th className='tablehead'>Running&nbsp;Current&nbsp;Value&nbsp;(km)</th>
                                    <th className='tablehead'>Cycling&nbsp;Goal&nbsp;(km)</th>
                                    <th className='tablehead'>Cycling&nbsp;Current&nbsp;Value&nbsp;(km)</th>
                                    <th className='tablehead'>Sleeping&nbsp;Goal&nbsp;(hr)</th>
                                    <th className='tablehead'>Sleeping&nbsp;Current&nbsp;Value&nbsp;(hr)</th>
                                    <th className='tablehead'>Weight&nbsp;Loss&nbsp;Goal&nbsp;(kg)</th>
                                    <th className='tablehead'>Weight&nbsp;Loss&nbsp;Current&nbsp;Value&nbsp;(kg)</th>
                                    <th className='tablehead'>Walking&nbsp;Goal&nbsp;(steps)</th>
                                    <th className='tablehead'>Wlking&nbsp;Current&nbsp;Value&nbsp;(steps)</th>
                                    <th className='tablehead'>Water&nbsp;Goal&nbsp;(l)</th>
                                    <th className='tablehead'>Water&nbsp;Current&nbsp;Value(l)</th>
                                    <th className='tablehead'>Calories&nbsp;Goal&nbsp;(kcal)</th>
                                    <th className='tablehead'>Calories&nbsp;Current&nbsp;Value&nbsp;(kcal)</th>
                                    <th className='tablehead'></th>
                                    <th className='tablehead'></th>
                                </tr>
                            </thead>

                            <tbody>
                                {user?.data?.length > 0 ? (
                                    // Map through the array of Goals & Tracking and display each one
                                    user.data.map((track, index) => (
                                        <tr key={track._id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.RunningGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.RunningCurrentValue || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.cyclingGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.cyclingCurrentValue || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.sleepingGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.sleepingCurrentValue || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.weightlossGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.weightlossCurrentValue || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.walkingGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.walkingCurrentValue || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.waterGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.waterCurrentValue || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.CaloriesGoal || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{track.CaloriesCurrentValue || 'N/A'}</td>
                                            <td><button onClick={() => editTrack(track)} className='border rounded-md px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white'>Edit</button></td>
                                            <td><button onClick={() => handleDelete(track._id)} className='border rounded-md px-3 py-1 bg-red-500 hover:bg-red-700 text-white'>Delete</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-700">
                                            No Goals and Trackings available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Popup that appears when clicking the 'ADD Goals & Trackings' button */}
            {showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white py-5 w-1/3'>
                        <div className='bg-white p-6 rounded-lg max-h-96 overflow-x-auto'>
                            <h2 className='text-2xl text-center text-primary-500 font-semibold mb-4'>{editTrackId ? 'Edit Goal' : 'Add New Goal & Traks'}</h2>
                            {/* Add form or content here to handle the new Goal & Trackings creation */}
                            <form onSubmit={handleSubmit} className='py-5'>
                                <div className='mb-4'>
                                    <label className='addLable'>Running Goal(km)</label>
                                    <input type="number"
                                        name="RunningGoal"
                                        value={formData.RunningGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Running Current Value(km)</label>
                                    <input
                                        type="number"
                                        name="RunningCurrentValue"
                                        value={formData.RunningCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Cycling Goal(km)</label>
                                    <input
                                        type="number"
                                        name="cyclingGoal"
                                        value={formData.cyclingGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Cycling Current Value(km)</label>
                                    <input
                                        type="number"
                                        name="cyclingCurrentValue"
                                        value={formData.cyclingCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Sleeping Goal(hr)</label>
                                    <input
                                        type="number"
                                        name="sleepingGoal"
                                        value={formData.sleepingGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Sleeping Current Value(hr)</label>
                                    <input
                                        type="number"
                                        name="sleepingCurrentValue"
                                        value={formData.sleepingCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Weight Loss Goal(kg)</label>
                                    <input
                                        type="number"
                                        name="weightlossGoal"
                                        value={formData.weightlossGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Weight Loss Current Value(kg)</label>
                                    <input
                                        type="number"
                                        name="weightlossCurrentValue"
                                        value={formData.weightlossCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Walking Goal(steps)</label>
                                    <input
                                        type="number"
                                        name="walkingGoal"
                                        value={formData.walkingGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Walking Current Value(steps)</label>
                                    <input
                                        type="number"
                                        name="walkingCurrentValue"
                                        value={formData.walkingCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Water Goal(l)</label>
                                    <input
                                        type="number"
                                        name="waterGoal"
                                        value={formData.waterGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Water Current Value(l)</label>
                                    <input
                                        type="number"
                                        name="waterCurrentValue"
                                        value={formData.waterCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Calories Goal(kcal)</label>
                                    <input
                                        type="number"
                                        name="CaloriesGoal"
                                        value={formData.CaloriesGoal}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='addLable'>Calories Current Value(kcal)</label>
                                    <input
                                        type="number"
                                        name="CaloriesCurrentValue"
                                        value={formData.CaloriesCurrentValue}
                                        onChange={handleInputChange}
                                        className='addinput'
                                    />
                                </div>

                                <div className='text-center'>
                                    <button
                                        type="submit"
                                        className='py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded'
                                    >
                                        {editTrackId ? 'Update Goal' : 'Add Goal'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={trackPopup}
                                        className='ml-4 py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded'
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Goal