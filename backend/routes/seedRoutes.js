import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Delete existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Insert new users
    const createdUsers = await User.insertMany(data.users);
    
    // Insert new products
    const createdProducts = await Product.insertMany(data.products);
    
    // Insert orders (linking to created users)
    const adminUser = createdUsers[0]._id;
    const ordersWithUserIds = data.orders.map(order => ({
      ...order,
      user: adminUser, // Assigning orders to admin user for demo
    }));
    const createdOrders = await Order.insertMany(ordersWithUserIds);

    res.status(200).json({ 
      message: 'Data seeded successfully',
      users: createdUsers,
      products: createdProducts,
      orders: createdOrders
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error seeding data',
      error: error.message 
    });
  }
});

export default seedRouter;
