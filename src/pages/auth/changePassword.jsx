import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import changepassword from '../../assets/change_password.png'

function ChangePassword() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setconformPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === conformPassword) {

            const formData = {
                email,
                password
            };

            try {
                // Change password logic here
                const response = await fetch('https://health-and-wellness-app-back-end.onrender.com/changepassword', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    console.log('Password changed successfully');
                    navigate('/');
                } else {
                    const error = await response.json();
                    console.error('Error:', error.error);
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
            alert('Password changed successfully');
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="border border-primary shadow-lg rounded-lg w-full max-w-md bg-white p-8">
                <div className="flex flex-col items-center">
                    <img src={changepassword} alt="changepassword Icon" className="my-5 h-16 w-16" />
                    <h2 className="text-2xl font-semibold text-primary mb-4">Change Password</h2>
                </div>
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <label htmlFor="newpassword" className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                        <input
                            type="Password"
                            id="changePassword"
                            name="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="conformpassword" className="block text-sm font-medium text-gray-600 mb-1">Conform Pasword</label>
                        <input
                            type="password"
                            id="conformpassword"
                            name="password"
                            onChange={(e) => setconformPassword(e.target.value)}
                            required
                            className="border border-primary rounded w-full py-2 px-3 focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-700 transition duration-200"
                    >
                        submit
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ChangePassword