// import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store.js';
import CheckoutSteps from '../components/CheckoutSteps';
import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 500 ? round2(0) : round2(10);
  cart.taxPrice = round2((18 / 100) * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          size: cart.size,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
      {/* console.log(cart.size); */}
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <div className="text-center text-indigo-500">
        <h1 className="my-3 text-2xl font-bold ">Preview Order</h1>
      </div>
      <div className="text-black">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="p-4 shadow mb-4">
              <h2 className="font-bold mb-2">Shipping</h2>
              <p>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
              <Link to="/shipping" className="text-blue-500">
                Edit
              </Link>
            </div>

            <div className="p-4 shadow mb-4">
              <h2 className="font-bold mb-2">Payment</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
              <Link to="/payment" className="text-blue-500">
                Edit
              </Link>
            </div>

            <div className="p-4 shadow mb-4">
              <h2 className="font-bold mb-2">Items</h2>
              <ul className="list-none">
                {cart.cartItems.map((item) => (
                  <li key={item._id} className="py-1">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full rounded"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </div>
                      <div className="w-1/4">
                        <span>{item.quantity}</span>
                        <br></br>
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="w-1/4">₹{item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/cart" className="text-blue-500">
                Edit
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <div className="p-4 shadow">
              <h2 className="font-bold mb-2">Order Summary</h2>
              <ul className="list-none">
                <li className="py-1 flex justify-between">
                  <span>Items</span>
                  <span>₹{cart.itemsPrice.toFixed(2)}</span>
                </li>
                <li className="py-1 flex justify-between">
                  <span>Shipping</span>
                  <span>₹{cart.shippingPrice.toFixed(2)}</span>
                </li>
                <li className="py-1 flex justify-between">
                  <span>Tax</span>
                  <span>₹{cart.taxPrice.toFixed(2)}</span>
                </li>
                <li className="py-1 flex justify-between">
                  <strong>Order Total</strong>
                  <strong>₹{cart.totalPrice.toFixed(2)}</strong>
                </li>
                <li className="py-1">
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded"
                  >
                    Place Order
                  </button>
                  {loading && <LoadingBox></LoadingBox>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
