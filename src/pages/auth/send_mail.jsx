import React, { useState } from 'react'
import sendotp from "../../assets/send_otp.png";
import { useNavigate } from 'react-router-dom';

function Sendmail() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email
        };

        try {
            const response = await fetch('https://health-and-wellness-app-back-end.onrender.com/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                navigate('/verifyotp');
            } else {
                throw new Error('Failed to send otp')
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="border border-primary shadow-lg rounded-lg w-full max-w-md bg-white p-8">
                <div className="flex flex-col items-center">
                    <img src={sendotp} alt="sendotp Icon" className="my-5 h-16 w-16" />
                    <h2 className="text-2xl font-semibold text-primary mb-4">Send OTP</h2>
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
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-700 transition duration-200"
                    >
                        Send OTP
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Sendmail