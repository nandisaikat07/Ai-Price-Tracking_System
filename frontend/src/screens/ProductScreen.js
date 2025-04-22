import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store.js';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  const [size, setSize] = useState('');
  // const [color, setColor] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/v1/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity, size },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // Removed unused selectedSize state variable
  // Removed unused selectedColor state variable

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>{slug}</h1>
      <div className="flex text-black ">
        <div className="w-1/2">
          <img
            className="w-full"
            src={selectedImage || product.image}
            alt={product.name}
          ></img>
        </div>
        <div className="w-1/4 px-4 ">
          <ul>
            <li>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li>Price : ₹{product.price}</li>
            <li className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[product.image, ...product.images].map((x) => (
                  <div key={x} className="col-span-1">
                    <div className="border rounded shadow">
                      <button
                        className="w-full h-full"
                        type="button"
                        onClick={() => setSelectedImage(x)}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={x}
                          alt="product"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </li>

            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="w-1/4 px-4">
          <div className="border p-4">
            <ul>
              <li>
                <div className="flex justify-between ">
                  <div>Price:</div>
                  <div>₹{product.price}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>Status:</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded ">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <>
                  <li>
                    <label>Size:</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="S">Small</option>
                      <option value="M">Medium</option>
                      <option value="L">Large</option>
                    </select>
                  </li>
                  {/* <li>
                    <label>Color:</label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                    </select>
                  </li> */}
                  <li>
                    <button
                      onClick={addToCartHandler}
                      className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                      Add to Cart
                    </button>
                  </li>
                </>
              )}
            </ul>
            <div className="my-6">
              <h2 className="text-2xl font-bold mb-3" ref={reviewsRef}>
                Reviews
              </h2>
              {product.reviews.length === 0 && (
                <div className="text-center py-3">There is no review</div>
              )}
              <ul>
                {product.reviews.map((review) => (
                  <li key={review._id} className="mb-3 p-3 shadow-lg">
                    <strong className="font-bold">{review.name}</strong>
                    <Rating rating={review.rating} caption=" "></Rating>
                    <p className="text-sm">
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
              <div className="my-6">
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <h2 className="text-xl font-bold mb-3">
                      Write a customer review
                    </h2>
                    <div className="mb-3">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="rating"
                      >
                        Rating
                      </label>
                      <select
                        id="rating"
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="floatingTextarea"
                      >
                        Comments
                      </label>
                      <textarea
                        id="floatingTextarea"
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Leave a comment here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        disabled={loadingCreateReview}
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 disabled:opacity-50"
                      >
                        Submit
                      </button>
                      {loadingCreateReview && <div>Loading...</div>}
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-3">
                    Please{' '}
                    <Link
                      to={`/signin?redirect=/product/${product.slug}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Sign In
                    </Link>{' '}
                    to write a review
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
