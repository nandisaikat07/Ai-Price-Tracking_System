import React, { useEffect, useReducer, useCallback, useRef } from 'react';
import axios from '../utils/axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet-async';
import { FaCamera, FaSearch, FaTimes } from 'react-icons/fa';
import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
        error: ''
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'IMAGE_SEARCH_START':
      return { ...state, imageSearchLoading: true, error: '' };
    case 'IMAGE_SEARCH_SUCCESS':
      return { 
        ...state, 
        products: action.payload.products,
        imageSearchLoading: false,
        error: '' 
      };
    case 'IMAGE_SEARCH_FAIL':
      return { ...state, imageSearchLoading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const [{ loading, error, products, page, pages, imageSearchLoading }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
    page: 1,
    pages: 0,
    imageSearchLoading: false,
  });

  const [searchQuery] = React.useState('');
  const [selectedCategory] = React.useState('all');
  const [priceRange] = React.useState('all');
  const [sortBy] = React.useState('featured');
  const [previewImage, setPreviewImage] = React.useState(null);
  const fileInputRef = useRef(null);

  // Function to seed initial data
  const seedData = async () => {
    try {
      await axios.get('/api/v1/seed');
      console.log('Data seeded successfully');
    } catch (err) {
      console.error('Error seeding data:', err);
    }
  };

  const fetchData = useCallback(async (pageNumber = 1) => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/v1/products?page=${pageNumber}`);
      console.log('Fetched data:', data);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      console.error('Error fetching products:', err);
      dispatch({
        type: 'FETCH_FAIL',
        payload: err.response && err.response.data.message
          ? err.response.data.message
          : 'Could not connect to the server. Please try again.',
      });
    }
  }, []);

  const handleImageSearch = async (file) => {
    if (!file) return;

    try {
      dispatch({ type: 'IMAGE_SEARCH_START' });
      
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Upload image and get similar products
      const { data } = await axios.post('/api/v1/products/search-by-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPreviewImage(URL.createObjectURL(file));
      dispatch({ type: 'IMAGE_SEARCH_SUCCESS', payload: { products: data.products } });
    } catch (err) {
      console.error('Error searching by image:', err);
      dispatch({
        type: 'IMAGE_SEARCH_FAIL',
        payload: 'Failed to search by image. Please try again.',
      });
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageSearch(file);
    }
  };

  const clearImageSearch = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fetchData(1);
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.response?.status === 404) {
          await seedData();
          await fetchData();
        }
      }
    };

    initializeData();
  }, [fetchData]);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'low' && product.price < 1000) ||
      (priceRange === 'medium' && product.price >= 1000 && product.price < 5000) ||
      (priceRange === 'high' && product.price >= 5000);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Helmet>
        <title>Products - AI Price Tracking</title>
      </Helmet>

      {/* Main content with proper padding for navbar */}
      <div className="pt-20 pb-12 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Featured Products
        </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover amazing products at the best prices. Track and compare prices across multiple stores.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex justify-end items-center mb-8 fade-in">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn glass hover:bg-opacity-20 text-white"
                disabled={imageSearchLoading}
              >
                <FaCamera />
                <span>Search by Image</span>
              </button>
            </div>
          </div>

          {/* Preview Image Section */}
          {previewImage && (
            <div className="mb-8 relative inline-block fade-in">
              <img
                src={previewImage}
                alt="Search preview"
                className="h-32 w-32 object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={clearImageSearch}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Loading and Error States */}
          {loading || imageSearchLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading-spinner"></div>
          </div>
        ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded fade-in">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid-auto-fit">
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12 fade-in">
                  <p className="text-2xl text-white mb-2">No products found</p>
                  <p className="text-gray-300">
                    Try adjusting your search criteria or check back later.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!previewImage && pages > 1 && (
                <div className="mt-12 flex justify-center fade-in">
                  <nav className="flex flex-wrap gap-2 justify-center">
                    {[...Array(pages).keys()].map((x) => (
                      <button
                        key={x + 1}
                        className={`btn ${
                          x + 1 === page
                            ? 'btn-primary'
                            : 'glass text-white hover:bg-opacity-20'
                        }`}
                        onClick={() => fetchData(x + 1)}
                      >
                        {x + 1}
                      </button>
                    ))}
                  </nav>
          </div>
        )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
