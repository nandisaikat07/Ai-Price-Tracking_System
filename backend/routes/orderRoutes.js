import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
// import { isAuth } from '../utils.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import dotenv from 'dotenv';
import {
  isAuth,
  isAdmin,
  mailgun,
  payOrderEmailTemplate,
  DeliveryDoneEmailTemplate,
  payDoneEmailTemplate,
} from '../utils.js';
import nodemailer from 'nodemailer';

const orderRouter = express.Router();
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ST_EMAIL_ID,
    pass: process.env.ST_PASS,
  },
});

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('Its in5');
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

// orderRouter.post(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     console.log('Its in4');
//     const newOrder = new Order({
//       orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
//       shippingAddress: req.body.shippingAddress,
//       paymentMethod: req.body.paymentMethod,
//       itemsPrice: req.body.itemsPrice,
//       shippingPrice: req.body.shippingPrice,
//       taxPrice: req.body.taxPrice,
//       totalPrice: req.body.totalPrice,
//       user: req.user._id,
//     });

//     const order = await newOrder.save();
//     res.status(201).send({ message: 'New Order Created', order });
//     console.log(7);
//     var mailOptions = {
//       from: 'Stdio Nupur <buystudionupur@gmail.com>',
//       to: `${order.user.name} <${order.user.email}>`,
//       subject: `Order ${order._id} has been updated`,
//       html: payOrderEmailTemplate(updatedOrder),
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   })
// );

// orderRouter.post(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     console.log('Its in4');
//     const newOrder = new Order({
//       orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
//       shippingAddress: req.body.shippingAddress,
//       paymentMethod: req.body.paymentMethod,
//       itemsPrice: req.body.itemsPrice,
//       shippingPrice: req.body.shippingPrice,
//       taxPrice: req.body.taxPrice,
//       totalPrice: req.body.totalPrice,
//       user: req.user._id,
//     });

//     const order = await newOrder.save();
//     res.status(201).send({ message: 'New Order Created', order });
//     const order2 = await Order.findById(req.params.id).populate(
//       'user',
//       'email name'
//     );
//     console.log(7);
//     console.log(order2.user.email);
//     var mailOptions = {
//       from: 'Stdio Nupur <buystudionupur@gmail.com>',
//       // to: `Tanmoy <tanmoydeb2002@gmail.com>`,
//       to: `${order2.user.name} <${order2.user.email}>`,
//       subject: `New Order ${order._id} has been placed`,
//       html: payOrderEmailTemplate(order),
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   })
// );

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('Its in4');
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
    console.log(7);
    var mailOptions = {
      from: 'Stdio Nupur <buystudionupur@gmail.com>',
      to: `${req.user.name} <${req.user.email}>`,
      subject: `New Order ${order._id} has been placed`,
      html: payOrderEmailTemplate(order),
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('Its in3');
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('Its in 2');
    const order = await Order.findById(req.params.id);
    console.log(order.user.email);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // const order = await Order.findById(req.params.id);
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      if (order.isDelivered) {
        console.log('Done');
        // console.log(order.user.email);
        var mailOptions = {
          from: 'Stdio Nupur <buystudionupur@gmail.com>',
          to: `${order.user.name} <${order.user.email}>`,
          subject: `New Order ${order._id} has been placed`,
          html: DeliveryDoneEmailTemplate(order),
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('Its in');
    // const order = await Order.findById(req.params.id);
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      if (order.isPaid) {
        console.log('Done');
        // console.log(order.user.email);
        var mailOptions = {
          from: 'Stdio Nupur <buystudionupur@gmail.com>',
          to: `${order.user.name} <${order.user.email}>`,
          subject: `New Order ${order._id} has been placed`,
          html: payDoneEmailTemplate(order),
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('Its in 6');
    const order = new Order({
      //... your order creation logic
    });
    const createdOrder = await order.save();

    if (createdOrder) {
      var mailOptions = {
        from: 'Stdio Nupur <buystudionupur@gmail.com>',
        to: `${createdOrder.user.name} <${createdOrder.user.email}>`,
        subject: `New Order ${createdOrder._id} has been placed`,
        html: payOrderEmailTemplate(createdOrder),
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    } else {
      res.status(500).send({ message: 'Error in Creating Order' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
