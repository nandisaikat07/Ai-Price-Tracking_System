import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Store } from '../Store.js';

function CustomTS() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const tshirtImages = {
    red: 'images/red.jpg',
    blue: 'images/blue.jpg',
    white: 'images/white.jpg',
    black: 'images/black.jpg',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', image);

    const result = await axios.post('/your_upload_route', formData);
    // Send the data to the admin
    // You might use a function like `sendToAdmin(image, color, size, result.data)`

    const customProduct = {
      _id: 'custom' + Date.now(),
      name: 'Custom T-Shirt',
      image: result.data.url,
      color,
      size,
    };

    const existItem = cartItems.find((x) => x._id === customProduct._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (quantity > 1) {
      window.alert('You have already added this custom t-shirt to the cart');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...customProduct, quantity },
    });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  //   const handleImageChange = (event) => {
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //   };

  return (
    <div className="pt-10">
      <form onSubmit={handleSubmit}>
        <label>
          Upload image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <label>
          Choose color:
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">--Please choose a color--</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </label>
        <label>
          Choose size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">--Please choose a size--</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <button onClick={handleSubmit}>Add to Cart</button>
      </form>
      <div
        className="tshirt-preview"
        style={{
          backgroundImage: `url(${tshirtImages[color]})`,
          backgroundSize: 'cover',
          width: '200px',
          height: '300px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100px',
            height: '100px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>
    </div>
  );
}

export default CustomTS;
