import jwt from 'jsonwebtoken';
import mg from 'mailgun.js';
import dotenv from 'dotenv';

export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'http://localhost:5001';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

dotenv.config();

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${order.shippingAddress.fullName},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> ₹${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> ₹${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax:</td>
  <td align="right"> ₹${order.taxPrice.toFixed(2)}</td>
  <tr>
  <td colspan="2"> . cgst(9%):</td>
  <td align="right"> : ₹${(order.taxPrice / 2).toFixed(2)}</td>
  </tr>
  </tr>
  <tr>
  <td colspan="2"> . sgst(9%):</td>
  <td align="right"> : ₹${(order.taxPrice / 2).toFixed(2)}</td>
  </tr>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> ₹${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> ₹${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  <td colspan="2">Payment Status:</td>
  <td align="right">${order.isPaid ? 'Paid' : 'Not Paid'}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};
export const OrderStatusEmailTemplate = (order) => {
  return `<h1>Your Order Is Out For Delivery Today</h1>
  <p>
  Hello ${order.shippingAddress.fullName},
  </p>
  <p>
  We are excited to let you know that your order [${
    order._id
  }] (${order.createdAt
    .toString()
    .substring(
      0,
      10
    )}) is out for delivery and will arrive today. Please ensure someone is available to receive the package.
  </p>
  <h2>Order Details:</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${orderItems
    .map(
      (item) => `
  <tr>
  <td>${item.name}</td>
  <td align="center">${item.quantity}</td>
  <td align="right">₹${item.price.toFixed(2)}</td>
  </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong>₹${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  <tr>
  <td colspan="2">Payment Status:</td>
  <td align="right">${order.isPaid ? 'Paid' : 'Not Paid'}</td>
  </tr>
  </tfoot>
  </table>
  <h2>Shipping Address:</h2>
  <p>
  ${shippingAddress.fullName},<br/>
  ${shippingAddress.address},<br/>
  ${shippingAddress.city},<br/>
  ${shippingAddress.country},<br/>
  ${shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thank you for shopping with us. If you have any questions or concerns, please don't hesitate to contact us.
  </p>
  
  `;
};
export const payDoneEmailTemplate = (order) => {
  return `<h1>Your Payment Has Been Received</h1>
  <p>
  Hi ${order.shippingAddress.fullName},</p>
  <p>We have successfully received your payment for the following order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> ₹${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> ₹${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax:</td>
  <td align="right"> ₹${order.taxPrice.toFixed(2)}</td>
  <tr>
  <td colspan="2"> . cgst(9%):</td>
  <td align="right"> : ₹${(order.taxPrice / 2).toFixed(2)}</td>
  </tr>
  </tr>
  <tr>
  <td colspan="2"> . sgst(9%):</td>
  <td align="right"> : ₹${(order.taxPrice / 2).toFixed(2)}</td>
  </tr>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> ₹${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> ₹${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  We will process your order shortly. If you have any questions or concerns, please don't hesitate to contact us.
  </p>
  `;
};

export const DeliveryDoneEmailTemplate = (order) => {
  return `<h1>Your Order Has Been Delivered</h1>
  <br></br>
  <p>
  Hi ${order.shippingAddress.fullName},</p>
  <p>Your order has been successfully delivered. Thank you for shopping with us.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <h2>At Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  We hope you enjoy your purchase. If you have any questions or concerns, please don't hesitate to contact us.
  </p>
  <br></br>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};
