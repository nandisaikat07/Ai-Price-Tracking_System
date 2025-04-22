import React, { useState } from 'react';
import { FaBell, FaChartLine, FaCog, FaTrash, FaExternalLinkAlt, FaEnvelope } from 'react-icons/fa';
import PriceChart from '../components/PriceChart';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('tracked');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlertThreshold, setPriceAlertThreshold] = useState(10);

  // Sample data - replace with actual data from your backend
  const trackedProducts = [
    {
      id: 1,
      name: 'Sample Product 1',
      currentPrice: 99.99,
      initialPrice: 129.99,
      image: 'https://via.placeholder.com/150',
      priceHistory: [
        { date: '2024-01-01', price: 129.99 },
        { date: '2024-02-01', price: 119.99 },
        { date: '2024-03-01', price: 99.99 },
      ],
      alerts: [
        { type: 'price_drop', threshold: 100 },
      ],
    },
    // Add more sample products
  ];

  const alerts = [
    {
      id: 1,
      productName: 'Sample Product 1',
      type: 'price_drop',
      message: 'Price dropped by 20%',
      date: '2024-03-01',
      read: false,
    },
    // Add more sample alerts
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your products and manage your price alerts
          </p>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('tracked')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'tracked'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tracked Products
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'alerts'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Alerts
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-6">
          {activeTab === 'tracked' && (
            <div className="grid grid-cols-1 gap-6">
              {trackedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-500">
                            Current Price:{' '}
                            <span className="text-blue-600 font-medium">
                              ${product.currentPrice}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Initial Price:{' '}
                            <span className="text-gray-600">
                              ${product.initialPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        title="Set Alert"
                        className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors duration-200"
                      >
                        <FaBell />
                      </button>
                      <button
                        title="Remove"
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                  <PriceChart priceHistory={product.priceHistory} productName={product.name} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="bg-white rounded-lg shadow-md divide-y">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 ${alert.read ? '' : 'bg-blue-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{alert.productName}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      title="Remove Alert"
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium mb-6">Notification Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive price alerts via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Price Alert Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={priceAlertThreshold}
                    onChange={(e) => setPriceAlertThreshold(e.target.value)}
                    className="w-full max-w-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="100"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Get notified when price drops by this percentage
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 