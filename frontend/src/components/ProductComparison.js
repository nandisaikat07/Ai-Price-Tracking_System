import React, { useState } from 'react';
import { FaShoppingCart, FaBell, FaChartLine, FaExternalLinkAlt } from 'react-icons/fa';

const ProductComparison = ({ products }) => {
  const [selectedFeatures, setSelectedFeatures] = useState(['price', 'rating', 'shipping']);

  const features = {
    price: 'Price',
    rating: 'Rating',
    shipping: 'Shipping',
    availability: 'Availability',
    seller: 'Seller',
    warranty: 'Warranty',
  };

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Compare Products</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(features).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleFeature(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedFeatures.includes(key)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-6 text-left">Product</th>
              {selectedFeatures.map(feature => (
                <th key={feature} className="py-4 px-6 text-left">
                  {features[feature]}
                </th>
              ))}
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.platform}</p>
                    </div>
                  </div>
                </td>
                {selectedFeatures.map(feature => (
                  <td key={feature} className="py-4 px-6">
                    {feature === 'price' && (
                      <span className="font-medium text-blue-600">
                        ${product[feature].toFixed(2)}
                      </span>
                    )}
                    {feature === 'rating' && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{product[feature]}</span>
                      </div>
                    )}
                    {feature === 'shipping' && (
                      <span className={product[feature] === 'Free' ? 'text-green-600' : ''}>
                        {product[feature]}
                      </span>
                    )}
                    {feature === 'availability' && (
                      <span className={`${
                        product[feature] ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product[feature] ? 'In Stock' : 'Out of Stock'}
                      </span>
                    )}
                    {(feature === 'seller' || feature === 'warranty') && product[feature]}
                  </td>
                ))}
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button
                      title="Track Price"
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                    >
                      <FaChartLine />
                    </button>
                    <button
                      title="Set Alert"
                      className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-colors duration-200"
                    >
                      <FaBell />
                    </button>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      title="Visit Store"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductComparison; 