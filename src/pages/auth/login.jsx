import React, { useState } from 'react';
import login from '../../assets/login.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form data to send to the backend
        const formData = {
            email,
            password
        };

        try {
            const response = await fetch('https://health-and-wellness-app-back-end.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Store the token in localStorage (optional)
                localStorage.setItem('token', result.token);

                // Navigate to the dashboard
                navigate('/dashboard');
            } else {
                // Show error message
                setError(result.message || 'Invalid credentials');
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
            alert("An error occurred. Please try again.")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="border border-primary shadow-lg rounded-lg w-full max-w-md bg-white p-8">
                <div className="flex flex-col items-center">
                    <img src={login} alt="Login Icon" className="my-5 h-16 w-16" />
                    <h2 className="text-2xl font-semibold text-primary mb-4">Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <p className='flex justify-end  mb-6'><Link to="/sendmail" className=''>Forgot Password?</Link></p>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-700 transition duration-200"
                    >
                        Login
                    </button>
                    <p className='text-center mt-5'>Don't have an account yet? <Link to="/register" className='text-blue-600 focus:text-blue-800 hover:text-blue-800'>Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
