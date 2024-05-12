import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Modal from './Modal';
import PaymentForm from './PaymentForm';

const CheckoutForm = ({ stripePromise }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/items/")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    setItems([]);
                }
                setLoading(false); // Stop loading once data is fetched
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                setLoading(false); // Stop loading on error
            });
    }, []);

    const handleBuyNowClick = async (item) => {
        setSelectedItem(item);
        const response = await fetch("http://localhost:5000/create-payment-intent/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ id: item.id }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setModalOpen(true);
    };

    return (
        <div className="px-4 pt-8 pb-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-1 md:col-span-4 flex justify-center items-center">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : items.length > 0 ? items.map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img src={item.image_url} alt={item.name} className="w-full h-32 sm:h-48 object-cover"/>
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-xl font-semibold">${item.price / 100}</p>
                                <button onClick={() => handleBuyNowClick(item)}
                                        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center w-full col-span-1 md:col-span-4">No items available.</p>
                    )}
                </div>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div>
                    <h2 className="text-xl font-bold">{selectedItem?.name} - ${selectedItem?.price / 100}</h2>
                    <p>{selectedItem?.description}</p>
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <PaymentForm/>
                        </Elements>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default CheckoutForm;
