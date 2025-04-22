import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Apple MacBook Pro 14"',
      slug: 'apple-macbook-pro-14',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      price: 1999,
      countInStock: 10,
      brand: 'Apple',
      rating: 4.8,
      numReviews: 125,
      description: 'Latest MacBook Pro with M2 chip, 16GB RAM, 512GB SSD'
    },
    {
      name: 'Sony WH-1000XM4',
      slug: 'sony-wh-1000xm4',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      price: 348,
      countInStock: 15,
      brand: 'Sony',
      rating: 4.7,
      numReviews: 89,
      description: 'Premium noise-cancelling headphones with exceptional sound quality'
    },
    {
      name: 'Samsung 65" QLED 4K TV',
      slug: 'samsung-65-qled-4k',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      price: 1299,
      countInStock: 8,
      brand: 'Samsung',
      rating: 4.6,
      numReviews: 78,
      description: 'Stunning 4K QLED display with smart features'
    },
    {
      name: 'iPad Air',
      slug: 'ipad-air',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      price: 599,
      countInStock: 20,
      brand: 'Apple',
      rating: 4.9,
      numReviews: 156,
      description: 'Powerful and portable iPad with M1 chip'
    },
    {
      name: 'DJI Mini 3 Pro',
      slug: 'dji-mini-3-pro',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
      price: 759,
      countInStock: 12,
      brand: 'DJI',
      rating: 4.7,
      numReviews: 92,
      description: 'Compact drone with 4K camera and advanced features'
    },
    {
      name: 'Nintendo Switch OLED',
      slug: 'nintendo-switch-oled',
      category: 'Gaming',
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      price: 349,
      countInStock: 25,
      brand: 'Nintendo',
      rating: 4.8,
      numReviews: 143,
      description: 'Latest Nintendo Switch with vibrant OLED display'
    },
    {
      name: 'Canon EOS R6',
      slug: 'canon-eos-r6',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      price: 2499,
      countInStock: 6,
      brand: 'Canon',
      rating: 4.9,
      numReviews: 67,
      description: 'Professional mirrorless camera with advanced autofocus'
    },
    {
      name: 'Bose QuietComfort Earbuds',
      slug: 'bose-quietcomfort-earbuds',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      price: 279,
      countInStock: 18,
      brand: 'Bose',
      rating: 4.6,
      numReviews: 112,
      description: 'True wireless earbuds with superior noise cancellation'
    }
  ],
  orders: [
    {
      user: 'john@example.com',
      orderItems: [
        {
          name: 'MacBook Pro M2',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
          price: 1299,
        },
      ],
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main St',
        city: 'Boston',
        postalCode: '02108',
        country: 'USA',
      },
      paymentMethod: 'PayPal',
      itemsPrice: 1299,
      shippingPrice: 0,
      taxPrice: 129.9,
      totalPrice: 1428.9,
      isPaid: true,
      paidAt: '2024-03-15',
      isDelivered: false,
    },
  ],
};

export default data;
