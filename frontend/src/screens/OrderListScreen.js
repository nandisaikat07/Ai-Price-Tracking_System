import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store.js';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <div className="pt-10">
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center py-5 mr-2">Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table-auto w-full text-black border-black border">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">USER</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">PAID</th>
              <th className="px-4 py-2">DELIVERED</th>
              <th className="px-4 py-2">ACTIONS</th>
              {/* <th className="px-4 py-2">Size</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-black px-4 py-2">{order._id}</td>
                <td className="border border-black px-4 py-2">
                  {order.user ? order.user.name : 'DELETED USER'}
                </td>
                <td className="border border-black px-4 py-2">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="border border-black px-4 py-2">
                  {order.totalPrice.toFixed(2)}
                </td>
                <td className="border border-black px-4 py-2">
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </td>
                {/* <td className="border border-black px-4 py-2">
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </td> */}
                <td className="border border-black px-4 py-2">
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                {/* <td className="border border-black px-4 py-2">{order.user.size}</td> */}
                <td className="border border-black px-4 py-2">
                  <button
                    type="button"
                    className="bg-blue-400 text-black py-2 px-4 rounded mr-2"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="bg-blue-400 text-black py-2 px-4 rounded"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
