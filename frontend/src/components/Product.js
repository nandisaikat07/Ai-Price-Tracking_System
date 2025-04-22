import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store.js';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity, size: '' },
    });
  };

  return (
    <div
      className="relative flex w-23 flex-col rounded-xl bg-[#cc7d18] bg-clip-border text-white shadow colSad card-client"
      key={product.slug}
    >
      <div className="mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </Link>
      </div>
      <div className="p-6">
        <Link to={`/product/${product.slug}`}>
          <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            {product.name}
          </p>
        </Link>
        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
          <strong>₹{product.price}</strong>
        </p>
        <p>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </p>
        {product.countInStock === 0 ? (
          <button
            disabled
            className="block w-full select-none rounded-lg bg-gray-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-blue-gray-900 hover:text-black"
          >
            Out of stock
          </button>
        ) : (
          <button
            className="block w-full select-none rounded-lg bg-gray-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-blue-gray-900 hover:text-black"
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product; 