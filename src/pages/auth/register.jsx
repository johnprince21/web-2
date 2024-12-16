import React, { useState } from 'react';
import register from '../../assets/register.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [goals, setGoals] = useState('');
    const navigate = useNavigate();

    // Check if all fields are filled
    const formValid = username && email && password && age && gender && height && weight && goals;

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!username || !email || !password || !age || !gender || !height || !weight || !goals) {
            console.error("Please fill in all required fields.");
            return;
        }

        const formData = {
            username,
            email,
            password,
            age,
            gender,
            height,
            weight,
            goals
        }

        try {
            const response = await fetch('https://health-and-wellness-app-back-end.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Handle success
                console.log('User registered successfully');
                showAlert();
            } else {
                // Handle error
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // using onClick to show alert
    const showAlert = () => {
        alert('Form submitted successfully!');
        navigate('/login');
    }



    return (
        <div className="flex justify-center items-center h-full bg-gray-100">
            <div className="border border-primary shadow-lg rounded-lg w-full max-w-lg bg-white p-8">
                <div className="flex flex-col items-center">
                    <img src={register} alt="Register Icon" className="my-5 h-16 w-16" />
                    <h2 className="text-2xl font-semibold text-primary mb-4">Register User</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">User Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <div className='flex flex-wrap gap-5'>
                        <div className="mb-6">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                onChange={(e) => setAge(e.target.value)}
                                required
                                className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                onChange={(e) => setGender(e.target.value)}
                                required
                                value={gender}
                                className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-5'>
                        <div className="mb-6">
                            <label htmlFor="height" className="block text-sm font-medium text-gray-600 mb-1">Height</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                required
                                onChange={(e) => setHeight(e.target.value)}
                                className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-600 mb-1">Weight</label>
                            <input
                                type="weight"
                                id="weight"
                                name="weight"
                                required
                                onChange={(e) => setWeight(e.target.value)}
                                className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="goals" className="block text-sm font-medium text-gray-600 mb-1">Goals</label>
                        <textarea
                            rows="4"
                            id="goals"
                            name="goals"
                            required
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="Tell about you are Goals..."
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500 resize-none"
                        />
                    </div>
                    <button
                        type="submit" disabled={!formValid}
                        className={`w-full py-2 px-4 ${formValid ? 'bg-primary-500' : 'bg-primary-200'}  text-white rounded ${formValid ? 'hover:bg-primary-700' : 'hover:bg-primary-200'} transition duration-200`}
                    >
                        Register
                    </button>
                </form>
                <p className='text-center mt-5'>Already have an account? <Link to="/login" className='text-blue-600 focus:text-blue-800 hover:text-blue-800'> Login now</Link></p>
            </div>
        </div>
    );
}

export default Register;
