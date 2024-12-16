import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Nutritiongoal() {

    const [user, setUser] = useState('');
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editGoalId, setEditGoalId] = useState(null);
    const navigate = useNavigate();


    const handleReload = () => {
        navigate(0);  // This will reload the current page
    };

    // State for form input
    const [formData, setFormData] = useState({
        foodName: '',
        calories: '',
        protein: '',
        carbohydrates: '',
        fats: ''
    });

    // Nutrition goal data fetched from the database
    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        // Fetch Nutrition goal data using token
        axios.get('https://health-and-wellness-app-back-end.onrender.com/nutritiongoal/view', {
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

        // If editGoalId is set, perform PATCH request; otherwise, add a new goal
        if (editGoalId) {
            // Edit existing goal
            axios.patch(`https://health-and-wellness-app-back-end.onrender.com/nutritiongoal/${editGoalId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUser(prevState => {
                        return {
                            ...prevState,
                            data: prevState.data.map(goal =>
                                goal._id === editGoalId ? response.data : goal
                            )
                        };
                    });
                    setShowPopup(false);
                    handleReload();
                    setEditGoalId(null); // Reset after editing

                })
                .catch(error => setError(error));
        } else {
            // Add new goal
            const newGoal = { ...formData, date: new Date() };
            axios.post('https://health-and-wellness-app-back-end.onrender.com/nutritiongoal', newGoal, {
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


    const editGoal = (goal) => {
        setEditGoalId(goal._id);
        setFormData({
            foodName: goal.foodName,
            calories: goal.calories,
            protein: goal.protein,
            carbohydrates: goal.carbohydrates,
            fats: goal.fats,
        });
        setShowPopup(true);
    };

    const goalPopup = () => {
        setShowPopup(!showPopup);
        setEditGoalId(null);  // Reset edit ID when closing or reopening the popup
        setFormData({ foodName: '', calories: '', protein: '', carbohydrates: '', fats: '' });  // Clear form
    };


    if (error) {
        return <div>{error.message || error}</div>;  // Render error message
    }

    const handleDelete = (goalId) => {
        const token = localStorage.getItem('token');

        axios.delete(`https://health-and-wellness-app-back-end.onrender.com/nutritiongoal/${goalId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(() => {
                // Refresh the user data by removing the deleted goal
                setUser(prevState => ({
                    ...prevState,
                    data: prevState.data.filter(goal => goal._id !== goalId)
                }));
            })
            .catch(error => setError(error));
    };

    return (
        <>
            <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-center'>Nutrition Goals</h1>
                <div className='border py-2 px-3 mb-4 rounded ms-auto bg-primary-500 hover:bg-primary-700 focus:bg-primary-700 text-white font-semibold w-fit' onClick={goalPopup}>Add Nutrition Goals</div>

                <div className='max-h-96 overflow-x-auto'>

                    <table className='min-w-full table-auto border-collapse border border-gray-300'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='tablehead'>date</th>
                                <th className='tablehead'>foodName</th>
                                <th className='tablehead'>calories&nbsp;(mg)</th>
                                <th className='tablehead'>protein&nbsp;(mg)</th>
                                <th className='tablehead'>carbohydrates&nbsp;(g)</th>
                                <th className='tablehead'>fats&nbsp;(g)</th>
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
                                    // Map through the array of nutrition goals and display each one
                                    user.data.map((goal, index) => (
                                        <tr key={goal._id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {new Date(goal.date).toLocaleDateString() || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{goal.foodName || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{goal.calories || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{goal.protein || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{goal.carbohydrates || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{goal.fats || 'N/A'}</td>
                                            <td><button onClick={() => editGoal(goal)} className='border rounded-md px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white'>Edit</button></td>
                                            <td><button onClick={() => handleDelete(goal._id)} className='border rounded-md px-3 py-1 bg-red-500 hover:bg-red-700 text-white'>Delete</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-700">
                                            No nutrition goals available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            {/* Popup that appears when clicking the 'ADD Nutrition Goals' button */}
            {showPopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
                        <h2 className='text-2xl text-center text-primary-500 font-semibold mb-4'>{editGoalId ? 'Edit Goal' : 'Add New Goal'}</h2>
                        {/* Add form or content here to handle the new goal creation */}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label className='addLable'>Food Name</label>
                                <input type="text"
                                    name="foodName"
                                    value={formData.foodName}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>Calories</label>
                                <input
                                    type="number"
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>Protein</label>
                                <input
                                    type="number"
                                    name="protein"
                                    value={formData.protein}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>Carbohydrates</label>
                                <input
                                    type="number"
                                    name="carbohydrates"
                                    value={formData.carbohydrates}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='addLable'>Fats</label>
                                <input
                                    type="number"
                                    name="fats"
                                    value={formData.fats}
                                    onChange={handleInputChange}
                                    className='addinput'
                                />
                            </div>
                            <div className='text-center'>
                                <button
                                    type="submit"
                                    className='py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded'
                                >
                                    {editGoalId ? 'Update Goal' : 'Add Goal'}
                                </button>
                                <button
                                    type="button"
                                    onClick={goalPopup}
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

export default Nutritiongoal
