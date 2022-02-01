import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Headers from './components/Headers';
import Login from './components/Login';
import Registration from './components/Registration';
import Thankyou from './components/Thankyou'

import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Order from './components/Myprofile/Order';
import Address from './components/Myprofile/Address';
import MyAccount from './components/Myprofile/MyAccount';
import ChangePassword from './components/Myprofile/ChangePassword';
import Profile from './components/Myprofile/Profile';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ForgotPassword from './components/ForgotPassword';
import SingleProduct from './components/SingleProduct';
import OrderConfirmed from './components/OrderConfirmed';
import Invoicepdf from './components/Myprofile/InvoicePdf';
import AllOrders from './components/AllOrders';



function App() {
  return (
    <>


      <Router>
        <Headers />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/order" element={<Order />} />
          <Route path="/address" element={<Address />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/orderconfirm" element={<OrderConfirmed />} />
          <Route path="/invoicepdf" element={<Invoicepdf />} />

          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allorders" element={<AllOrders />} />
        </Routes>
        <Footer />
      </Router>


    </>
  );
}

export default App;
