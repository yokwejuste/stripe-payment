import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import SuccessPage from './SuccessPage';
import HomePage from './HomePage';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/checkout/" element={<CheckoutForm stripePromise={stripePromise}/>}/>
                <Route path="/success/" element={<SuccessPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
