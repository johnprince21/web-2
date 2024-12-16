import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import sendotp from '../../assets/send_otp.png';

function Verifyotp() {
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            otp
        };

        try {
            const response = await fetch('https://health-and-wellness-app-back-end.onrender.com/forgotpassword/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                navigate('/changePassword', { state: { email: result.email } });
            } else {
                throw new Error('Failed to send OTP');
            }

        } catch (err) {
            console.error('Error sending OTP:', err);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="border border-primary shadow-lg rounded-lg w-full max-w-md bg-white p-8">
                <div className="flex flex-col items-center">
                    <img src={sendotp} alt="sendotp Icon" className="my-5 h-16 w-16" />
                    <h2 className="text-2xl font-semibold text-primary mb-4">Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-600 mb-1">OTP</label>
                        <input
                            type="number"
                            id="otp"
                            name="otp"
                            onChange={(e) => setOTP(e.target.value)}
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

export default Verifyotp