import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    useEffect(() => {
        window.history.replaceState({}, document.title, "/success/");
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className={`text-3xl font-bold ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    Payment {status === 'success' ? "Successful" : "Failed"}
                </h1>
                <p className="mt-4 text-gray-600">
                    Thank you for your purchase.
                </p>
                <Link to="/checkout/"
                      className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Make another payment
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
