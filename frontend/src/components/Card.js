import React from 'react';

// Card data
import { useEffect, useState } from 'react';
import axios from 'axios';
// import data from '../data';

function AboutCards() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <img src={product.image} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AboutCards;
