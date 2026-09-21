import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer'; // <-- ADDED
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen'; // <-- ADDED
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import AdminLayout from './screens/admin/AdminLayout';
import DashboardScreen from './screens/admin/DashboardScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/profile" element={<ProfileScreen />} /> {/* <-- ADDED */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="products" element={<ProductListScreen />} />
            <Route path="product/:id/edit" element={<ProductEditScreen />} />
            <Route path="orders" element={<OrderListScreen />} />
          </Route>
        </Routes>
      </main>
      <Footer /> {/* <-- ADDED */}
    </div>
  );
}

export default App;