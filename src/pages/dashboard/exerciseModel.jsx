import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ExerciseModel() {

    const [user, setUser] = useState('');
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editExerciseId, setEditExerciseId] = useState(null);
    const navigate = useNavigate();

    const handleReload = () => {
        navigate(0);  // This will reload the current page
    };

    // State for form input
    const [formData, setFormData] = useState({
        type: '',
        duration: '',
        distance: '',
        caloriesBurned: '',
        date: ''
    });

    // Exercise Model data fetched from the database
    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        // Fetch Exercise MOdel data using token
        axios.get('https://health-and-wellness-app-back-end.onrender.com/exercisemodels/view', {
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

        // If editExerciseId is set, perform PATCH request; otherwise, add a new MOdel
        if (editExerciseId) {
            // Edit existing Model
            axios.patch(`https://health-and-wellness-app-back-end.onrender.com/exercisemodels/${editExerciseId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            data: prevState.data.map(exe =>
                                exe._id === editExerciseId ? response.data : exe
                            )
                        };
                    });
                    setShowPopup(false);
                    handleReload();
                    setEditExerciseId(null); // Reset after editing

                })
                .catch(error => setError(error));
        } else {
            // Add new Model
            const newModel = { ...formData, date: new Date() };
            axios.post('https://health-and-wellness-app-back-end.onrender.com/exercisemodels', newModel, {
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


    const editExercise = (exe) => {
        setEditExerciseId(exe._id);
        setFormData({
            type: exe.type,
            duration: exe.duration,
            distance: exe.distance,
            caloriesBurned: exe.caloriesBurned,
            date: exe.date,
        });
        setShowPopup(true);
    };


    const exePopup = () => {
        setShowPopup(!showPopup);
        setEditExerciseId(null);  // Reset edit ID when closing or reopening the popup
        setFormData({ type: '', duration: '', distance: '', caloriesBurned: '', date: '' });  // Clear form
    };


    if (error) {
        return <div>{error.message || error}</div>;  // Render error message
    }

    const handleDelete = (exeId) => {
        const token = localStorage.getItem('token');

        axios.delete(`https://health-and-wellness-app-back-end.onrender.com/exercisemodels/${exeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(() => {
                // Refresh the user data by removing the deleted Exercise Model
                setUser(prevState => ({
                    ...prevState,
                    data: prevState.data.filter(exe => exe._id !== exeId)
                }));
            })
            .catch(error => setError(error));
    };


    return (
        <>
            <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-center'>Exercise Model</h1>

                <div className='max-h-96 overflow-x-auto'>
                    <div className='border py-2 px-3 mb-4 rounded ms-auto bg-primary-500 hover:bg-primary-700 focus:bg-primary-700 text-white font-semibold w-fit' onClick={exePopup}>Add Exercise Model</div>
                    <table className='min-w-full table-auto border-collapse border border-gray-300'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='tablehead'>Exercise&nbsp;type</th>
                                <th className='tablehead'>Duration&nbsp;(hr)</th>
                                <th className='tablehead'>Distance&nbsp;(km)</th>
                                <th className='tablehead'>Calories&nbsp;Burned&nbsp;(mg)</th>
                                <th className='tablehead'>Date</th>
                                <th className='tablehead'></th>
                                <th className='tablehead'></th>
                            </tr>
                        </thead>

                        {loading ? (
                            <div className="flex justify-center items-center text-center py-4">
                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                                <p className="text-gray-700 text-sm mt-2">Loading...</p>
                            </div>
                        ) : (
                            <tbody>
                                {user?.data?.length > 0 ? (
                                    // Map through the array of Exercise Model and display each one
                                    user.data.map((exe, index) => (
                                        <tr key={exe._id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{exe.type || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{exe.duration || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{exe.distance || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{exe.caloriesBurned || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {new Date(exe.date).toLocaleDateString() || 'N/A'}
                                            </td>
                                            <td><button onClick={() => editExercise(exe)} className='border rounded-md px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white'>Edit</button></td>
                                            <td><button onClick={() => handleDelete(exe._id)} className='border rounded-md px-3 py-1 bg-red-500 hover:bg-red-700 text-white'>Delete</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-700">
                                            No Exercise Models available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>

            {/* Popup that appears when clicking the 'ADD Exercise Model' button */}
            {showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
                        <h2 className='text-2xl text-center text-primary-500 font-semibold mb-4'>{editExerciseId ? 'Edit Model' : 'Add New Model'}</h2>
                        {/* Add form or content here to handle the new MOdel creation */}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='addLable'>Exercise Typr</label>
                                <input type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>Duration</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>Distance</label>
                                <input
                                    type="number"
                                    name="distance"
                                    value={formData.distance}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>CaloriesBurned</label>
                                <input
                                    type="number"
                                    name="caloriesBurned"
                                    value={formData.caloriesBurned}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='text-center'>
                                <button
                                    type="submit"
                                    className='py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded'
                                >
                                    {editExerciseId ? 'Update Model' : 'Add Model'}
                                </button>
                                <button
                                    type="button"
                                    onClick={exePopup}
                                    className='ml-4 py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded'
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ExerciseModel