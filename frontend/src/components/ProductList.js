import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

// Sample data from popular electronics
const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009284541',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Latest iPhone with pro camera system',
    price: 999,
    countInStock: 20,
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    image: 'https://image-us.samsung.com/us/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'Ultimate Android experience with S Pen',
    price: 1199,
    countInStock: 15,
    rating: 4.7,
    numReviews: 12,
  },
  {
    name: 'MacBook Pro M3',
    slug: 'macbook-pro-m3',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Powerful laptop with M3 chip',
    price: 1599,
    countInStock: 10,
    rating: 4.9,
    numReviews: 20,
  },
  {
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    image: 'https://electronics.sony.com/image/5d02da5c0f1af45a3f8d5a6ab6bb3c56/WH-1000XM5_Standard_Black-Large.jpg',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Premium noise-cancelling headphones',
    price: 399,
    countInStock: 25,
    rating: 4.8,
    numReviews: 18,
  }
];

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/v1/products');
                if (data.products && data.products.length > 0) {
                    setProducts(data.products);
                } else {
                    // If no products in database, seed with sample data
                    await seedProducts();
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                if (err.response?.status === 404) {
                    await seedProducts();
                } else {
                    setError('Failed to load products. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const seedProducts = async () => {
        try {
            // Add sample products to database
            const promises = sampleProducts.map(product =>
                axios.post('/api/v1/products', product)
            );
            await Promise.all(promises);
            
            // Fetch the newly added products
            const { data } = await axios.get('/api/v1/products');
            setProducts(data.products);
        } catch (err) {
            console.error('Error seeding products:', err);
            setError('Failed to initialize products. Please try again later.');
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <Link to={`/product/${product.slug}`}>
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-gray-600">{product.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-2 text-sm">{product.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className={`${product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                    <span className="text-gray-500 text-sm">{product.brand}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;