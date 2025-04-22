import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store.js';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      })
    );
    navigate('/payment');
  };
  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox]);

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="my-3 text-2xl font-bold">Shipping Address</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="block text-lg font-medium text-black">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium text-black">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium text-black">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium text-black">
              Postal Code
            </label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium text-black">
              Country
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-400 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <div className="mb-3">
            <button
              id="chooseOnMap"
              type="button"
              className="bg-white text-black py-2 px-4 rounded"
              onClick={() => navigate('/map')}
            >
              Choose Location On Map
            </button>
            {shippingAddress.location && shippingAddress.location.lat ? (
              <div>
                LAT: {shippingAddress.location.lat}
                LNG:{shippingAddress.location.lng}
              </div>
            ) : (
              <div>No location</div>
            )}
          </div> */}

          <div className="mb-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium roundelgmd shadow-sm text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
