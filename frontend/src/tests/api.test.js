const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api/v1';

// Add default headers for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

async function testEndpoints() {
  console.log('Testing API Endpoints...\n');

  try {
    // Test health check endpoint first
    console.log('0. Testing health check');
    const healthResponse = await axios.get('http://localhost:5001/health');
    console.log('✓ Health check successful');
    console.log(`Status: ${healthResponse.status}`);
    console.log(`Response: ${JSON.stringify(healthResponse.data)}\n`);

    // Test fetching all products
    console.log('1. Testing GET /products');
    const productsResponse = await axios.get(`${API_BASE_URL}/products`);
    console.log('✓ Successfully fetched products');
    console.log(`Status: ${productsResponse.status}`);
    console.log(`Number of products: ${productsResponse.data.length}\n`);

    // Test fetching a single product
    console.log('2. Testing GET /products/slug/:slug');
    const productSlug = productsResponse.data[0]?.slug || 'sample-product';
    const productResponse = await axios.get(`${API_BASE_URL}/products/slug/${productSlug}`);
    console.log('✓ Successfully fetched product');
    console.log(`Status: ${productResponse.status}`);
    console.log(`Product name: ${productResponse.data.name}\n`);

    // Test user sign in
    console.log('3. Testing POST /users/signin');
    const signInResponse = await axios.post(`${API_BASE_URL}/users/signin`, {
      email: 'test@example.com',
      password: 'test123'
    });
    console.log('✓ Successfully signed in');
    console.log(`Status: ${signInResponse.status}`);
    console.log(`Token received: ${signInResponse.data.token ? 'Yes' : 'No'}\n`);

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    }
    if (error.request) {
      console.error('Request details:', error.request);
    }
  }
}

testEndpoints(); 