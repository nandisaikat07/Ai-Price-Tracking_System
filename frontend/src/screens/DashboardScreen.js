import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Store.js';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
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
    fetchData();
  }, [userInfo]);

  return (
    <div className=" pt-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-center ">Dashboard</h1>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 shadow-md">
                <h2 className="font-bold mb-2">
                  {summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0}
                </h2>
                <p>Users</p>
              </div>
              <div className="p-4 shadow-md">
                <h2 className="font-bold mb-2">
                  {summary.orders && summary.users[0]
                    ? summary.orders[0].numOrders
                    : 0}
                </h2>
                <p>Orders</p>
              </div>
              <div className="p-4 shadow-md">
                <h2 className="font-bold mb-2">
                  ₹
                  {summary.orders && summary.users[0]
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0}
                </h2>
                <p>Sales</p>
              </div>
            </div>
            <div className="my-3">
              <h2 className="text-xl font-bold">Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <div className="bg-blue-200 text-blue-700 p-3 rounded">
                  No Sale
                </div>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                />
              )}
            </div>
            <div className="my-3">
              <h2 className="text-xl font-bold">Categories</h2>
              {summary.productCategories.length === 0 ? (
                <div className="bg-blue-200 text-blue-700 p-3 rounded">
                  No Category
                </div>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
