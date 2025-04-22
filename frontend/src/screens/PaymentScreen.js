import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Make sure to replace this with your actual Stripe publishable key from your .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_your_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/payment');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: userInfo.email,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // Send payment info to your backend
      const response = await fetch('/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0),
          currency: 'usd',
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear cart and redirect to success page
        ctxDispatch({ type: 'CART_CLEAR' });
        localStorage.removeItem('cartItems');
        navigate('/order-success');
        toast.success('Payment successful!');
      } else {
        toast.error(result.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Card Information</h3>
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h4>
        <div className="space-y-2">
          {cart.cartItems.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>
                ${cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default function PaymentScreen() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Checkout
          </h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
} 