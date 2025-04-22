import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingCart, FaHeart, FaLock, FaTruck, FaUndo } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [loadingItems, setLoadingItems] = useState({});

  const updateCartHandler = async (item, quantity) => {
    setLoadingItems(prev => ({ ...prev, [item._id]: true }));
    try {
      if (quantity > item.countInStock) {
        toast.error('Sorry, product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
      toast.success('Cart updated successfully');
    } catch (err) {
      toast.error('Failed to update cart');
    } finally {
      setLoadingItems(prev => ({ ...prev, [item._id]: false }));
    }
  };

  const removeItemHandler = (item) => {
    try {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const saveForLaterHandler = (item) => {
    try {
      // Implement save for later functionality
      toast.success('Item saved for later');
    } catch (err) {
      toast.error('Failed to save item');
    }
  };

  const checkoutHandler = () => {
      navigate('/signin?redirect=/shipping');
  };

  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="flex items-center text-white hover:text-blue-200 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-4 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Shopping Cart</h2>
              
          {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingCart className="mx-auto text-white/50 text-6xl mb-4 animate-bounce" />
                  <p className="text-white/80 text-xl mb-4">Your cart is empty</p>
                  <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                      className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-white/20 last:border-0 last:pb-0 transform transition-all duration-300 hover:bg-white/5 rounded-lg p-4"
                >
                    <img
                      src={item.image}
                      alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
                    />
                      <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                          className="text-lg font-medium text-white hover:text-blue-200 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                        <p className="text-white/80 mt-1">₹{item.price.toFixed(2)}</p>
                        {item.countInStock > 0 ? (
                          <p className="text-green-400 text-sm">In Stock</p>
                        ) : (
                          <p className="text-red-400 text-sm">Out of Stock</p>
                        )}
                  </div>
                      <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                          disabled={item.quantity === 1 || loadingItems[item._id]}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                          <FaMinus className="text-white" />
                    </button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                          disabled={item.quantity === item.countInStock || loadingItems[item._id]}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                          <FaPlus className="text-white" />
                    </button>
                  </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveForLaterHandler(item)}
                          className="p-2 text-white/80 hover:text-red-400 transition-colors duration-200"
                          title="Save for later"
                        >
                          <FaHeart />
                        </button>
                    <button
                      onClick={() => removeItemHandler(item)}
                          className="p-2 text-red-400 hover:text-red-500 transition-colors duration-200"
                          title="Remove from cart"
                    >
                          <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-24 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-4">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tax (10%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 100 && (
                    <div className="text-sm text-blue-300 mt-2">
                      Add ₹{(100 - subtotal).toFixed(2)} more to get free shipping!
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-white">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
              </div>
                <button
                  onClick={checkoutHandler}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                >
                  Proceed to Checkout
                </button>
                  <div className="mt-4 space-y-2 text-center text-sm text-white/60">
                    <div className="flex items-center justify-center gap-2">
                      <FaLock className="text-green-400" />
                      <p>Secure Checkout</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaTruck className="text-blue-400" />
                      <p>Free Shipping on Orders Over ₹100</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaUndo className="text-purple-400" />
                      <p>Easy Returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
