import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="flex justify-between text-center mb-8">
      <div
        className={`w-1/4 ${props.step1 ? 'text-indigo-500' : 'text-gray-300'}`}
      >
        Sign-In
      </div>
      <div
        className={`w-1/4 ${props.step2 ? 'text-indigo-500' : 'text-gray-300'}`}
      >
        Shipping
      </div>
      <div
        className={`w-1/4 ${props.step3 ? 'text-indigo-500' : 'text-gray-300'}`}
      >
        Payment
      </div>
      <div
        className={`w-1/4 ${props.step4 ? 'text-indigo-500' : 'text-gray-300'}`}
      >
        Place Order
      </div>
    </div>
  );
}
