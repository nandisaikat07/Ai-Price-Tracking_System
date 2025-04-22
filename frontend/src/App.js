import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';
import { ThemeProvider } from './components/ThemeProvider';

// Screens
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AboutUs from './screens/AboutUs';
import ProductPage from './screens/ProductPage';
import ProductScreen from './screens/ProductScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import CustomTS from './screens/CustomTS';
import HomeScreen from './screens/HomeScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import PaymentScreen from './screens/PaymentScreen';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import FooterCus from './components/footerCus';

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <StoreProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <ToastContainer position="bottom-center" limit={1} />
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/product/:slug" element={<ProductScreen />} />
                  <Route path="/placeorder" element={<PlaceOrderScreen />} />
                  <Route path="/signin" element={<SignInScreen />} />
                  <Route path="/signup" element={<SignupScreen />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/productpage" element={<ProductPage />} />
                  <Route path="/customts" element={<CustomTS />} />
                  <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordScreen />} />
                  <Route path="/shipping" element={<ShippingAddressScreen />} />
                  <Route path="/payment" element={<PaymentScreen />} />

                  {/* Protected Routes */}
                  <Route
                    path="/order-success"
                    element={
                      <ProtectedRoute>
                        <OrderSuccessScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfileScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/map"
                    element={
                      <ProtectedRoute>
                        <MapScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order/:id"
                    element={
                      <ProtectedRoute>
                        <OrderScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orderhistory"
                    element={
                      <ProtectedRoute>
                        <OrderHistoryScreen />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <DashboardScreen />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <OrderListScreen />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <UserListScreen />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/user/:id"
                    element={
                      <AdminRoute>
                        <UserEditScreen />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRoute>
                        <ProductListScreen />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/product/:id"
                    element={
                      <AdminRoute>
                        <ProductEditScreen />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </main>
              <FooterCus />
            </div>
          </ThemeProvider>
        </StoreProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
