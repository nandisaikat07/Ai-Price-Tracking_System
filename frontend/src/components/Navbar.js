import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../Store';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="https://static.vecteezy.com/system/resources/previews/007/790/634/non_2x/a-global-tracking-logo-or-a-tracking-business-logo-concept-for-your-business-free-vector.jpg" className="h-12 w-auto" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
                <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : isScrolled
                    ? 'text-gray-900 hover:text-blue-600'
                    : 'text-white hover:text-blue-200'
                }`
              }
            >
              Home
                        </NavLink>
                        <NavLink
              to="/productpage"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : isScrolled
                    ? 'text-gray-900 hover:text-blue-600'
                    : 'text-white hover:text-blue-200'
                }`
              }
            >
              Products
                        </NavLink>
                        <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : isScrolled
                    ? 'text-gray-900 hover:text-blue-600'
                    : 'text-white hover:text-blue-200'
                }`
              }
            >
              About Us
                        </NavLink>
            
            {/* Cart Icon with Animation */}
            <Link
              to="/cart"
              className="relative group transform transition-transform duration-200 hover:scale-110"
            >
              <FaShoppingCart
                className={`text-2xl transition-colors duration-200 ${
                  isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              />
              {cart.cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </Link>

            {/* User Menu */}
              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 focus:outline-none ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  <FaUserCircle className="text-2xl" />
                  <span className="font-medium">{userInfo.name}</span>
                  </button>
                
                  {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUserCircle className="mr-2" />
                      Profile
                    </Link>
                    <Link
                          to="/orderhistory"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                      <FaShoppingCart className="mr-2" />
                          Order History
                    </Link>
                    {userInfo.isAdmin && (
                      <div className="relative">
                        <button
                          onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FaCog className="mr-2" />
                Admin
              </button>
                        {isAdminDropdownOpen && (
                          <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Products
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/users"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Users
                    </Link>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      onClick={signoutHandler}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className={`font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'text-gray-900 hover:text-blue-600'
                    : 'text-white hover:text-blue-200'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimes className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <FaBars className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
                </div>

        {/* Mobile menu with animation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-2 transform transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/productpage"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                to="/aboutus"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </NavLink>
              {userInfo ? (
                <>
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/orderhistory"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order History
                  </NavLink>
                  <button
                    onClick={signoutHandler}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <NavLink
                  to="/signin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              )}
            </div>
            </div>
          )}
      </div>
        </nav>
  );
};

export default Navbar;
