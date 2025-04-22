import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store.js';
import { getError } from '../utils';
import { toast } from 'react-toastify';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: (order.totalPrice / 82).toFixed(2) },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  async function onApprove2() {
    try {
      dispatch({ type: 'PAY_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'PAY_SUCCESS', payload: data });
      toast.success('Order is paid');
    } catch (err) {
      dispatch({ type: 'PAY_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="pt-10">
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <div className="text-black border-gray-400">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="p-4 shadow mb-4">
              <h2 className="font-bold mb-2">Shipping</h2>
              <p>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country};
                {order.shippingAddress.location &&
                  order.shippingAddress.location.lat && (
                    <a
                      target="_new"
                      href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                    >
                      Show On Map
                    </a>
                  )}
              </p>
              {/* <p>
              <strong>Name:</strong> {order?.shippingAddress?.fullName} <br />
              <strong>Address: </strong> {order?.shippingAddress?.address},
              {order?.shippingAddress?.city},{' '}
              {order?.shippingAddress?.postalCode},
              {order?.shippingAddress?.country}
              {order?.shippingAddress?.location?.lat && (
                <a
                  target="_new"
                  href={`https://maps.google.com?q=${order?.shippingAddress?.location?.lat},${order?.shippingAddress?.location?.lng}`}
                >
                  Show On Map
                </a>
              )}
            </p> */}

              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </div>

            <div className="p-4 shadow mb-4">
              <h2 className="font-bold mb-2">Payment</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </div>

            <div className="p-4 shadow mb-4">
              <h2 className="font-bold mb-2">Items</h2>
              <ul className="list-none">
                {order.orderItems.map((item) => (
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
                        <p>Size: {item.size}</p>
                      </div>
                      <div className="w-1/4">₹{item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <div className="p-4 shadow">
              <h2 className="font-bold mb-2">Order Summary</h2>
              <ul className="list-none">
                <li className="py-1 flex justify-between">
                  <span>Items</span>
                  <span>₹{order.itemsPrice.toFixed(2)}</span>
                </li>
                <li className="py-1 flex justify-between">
                  <span>Shipping</span>
                  <span>₹{order.shippingPrice.toFixed(2)}</span>
                </li>
                <li className="py-1 flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.taxPrice.toFixed(2)}</span>
                </li>
                <li className="py-1 flex justify-between">
                  <strong>Order Total</strong>
                  <strong>₹{order.totalPrice.toFixed(2)}</strong>
                </li>
                {!userInfo.isAdmin &&
                  !order.isPaid &&
                  order.paymentMethod !== 'Cash on Delivery' && (
                    <li className="py-1 relative z-0">
                      {isPending ? (
                        <LoadingBox />
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                    </li>
                  )}
                {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && ( */}
                {userInfo.isAdmin && !order.isDelivered && order.isPaid && (
                  <li className="mb-4">
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={deliverOrderHandler}
                      >
                        Deliver Order
                      </button>
                    </div>
                  </li>
                )}
                {userInfo.isAdmin && !order.isPaid && (
                  <li className="mb-4">
                    {loadingPay && <LoadingBox></LoadingBox>}
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onApprove2}
                      >
                        Paid
                      </button>
                    </div>
                  </li>
                )}
                {/* {userInfo.isAdmin && (
                <li className="mb-4">
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={deliverOrderHandler}
                    >
                      Paid
                    </button>
                  </div>
                </li>
              )} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
