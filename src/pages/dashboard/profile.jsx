import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {

    const [user, setUser] = useState('');
    const [error, setError] = useState(null);

    // user data is fetched from a database

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        // Fetch user data using token
        axios.get('https://health-and-wellness-app-back-end.onrender.com/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Set user data and loading state to false
                setUser(response.data);
            })
            .catch((error) => {
                setError('Error fetching user data');
            });
    }, []);

    // error handling

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-8">User Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-gray-500">Username:</p>
                        <p className="text-xl text-gray-800">{user?.data?.username ?? 'N/A'}</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-gray-500">Email:</p>
                        <p className="text-xl text-gray-800">{user?.data?.email ?? 'N/A'}</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-gray-500">Age:</p>
                        <p className="text-xl text-gray-800">{user?.data?.age ?? 'N/A'}</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-gray-500">Gender:</p>
                        <p className="text-xl text-gray-800">{user?.data?.gender ?? 'N/A'}</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-gray-500">Height:</p>
                        <p className="text-xl text-gray-800">{user?.data?.height ?? 'N/A'} cm</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className="text-lg font-medium text-gray-500">Weight:</p>
                        <p className="text-xl text-gray-800">{user?.data?.weight ?? 'N/A'} kg</p>
                    </div>

                    <div className="flex flex-col items-start col-span-2">
                        <p className="text-lg font-medium text-gray-500">Goals:</p>
                        <p className="text-xl text-gray-800">{user?.data?.goals ?? 'N/A'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile