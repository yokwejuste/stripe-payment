import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe.js has not loaded yet.");
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            payment_method: {
                card: elements.getElement(PaymentElement),
                billing_details: { name },
            },
            confirmParams: {
                return_url: 'http://localhost:3000/success?status=success',
            },
        });

        if (result.error) {
            console.log("Payment error:", result.error.message);
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
            navigate('/success?status=success');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
                <input
                    id="name"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Email</label>
                <input
                    id="email"
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Card Details</label>
                <div className="mt-1 bg-gray-50 p-3 rounded-md">
                    <PaymentElement className="w-full" />
                </div>
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default PaymentForm;
