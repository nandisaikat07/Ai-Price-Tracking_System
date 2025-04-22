import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store.js';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        {/* <h1 className="my-3 text-2xl font-bold">Payment Method</h1> */}
        {/* <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="inline-flex items-center button-28 active">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">PayPal</span>
            </label>
          </div>
          <div className="mb-3">
            <label className="inline-flex items-center button-28 active">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethodName === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Stripe</span>
            </label>
          </div>
          <div className="mb-3">
            <label className="inline-flex items-center button-28 active">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethodName === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form> */}

        <h1 className="my-3 text-2xl font-bold text-center text-blue-500">
          Payment Method
        </h1>
        <form
          onSubmit={submitHandler}
          className="bg-transparent border-black border-y-0 shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4 text-center "
        >
          <div className="mb-4">
            <label
              // className="inline-flex items-center button-28"
              className={`inline-flex items-center button-28 ${
                paymentMethodName === 'PayPal' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                className="form-radio "
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2 ">PayPal</span>
            </label>
          </div>
          {/* <div className="mb-4">
            <label
              className={`inline-flex items-center button-28 ${
                paymentMethodName === 'Stripe' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethodName === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2 ">Stripe</span>
            </label>
          </div> */}
          <div className="mb-4">
            <label
              className={`inline-flex items-center button-28 ${
                paymentMethodName === 'Cash on Delivery' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethodName === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2 ">Cash on Delivery</span>
            </label>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
