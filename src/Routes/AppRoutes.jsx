import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import Shop from "../Pages/Shop";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import OrderSuccess from "../Pages/OrderSuccess";
import Contact from "../Pages/Contact";
import FAQ from "../Pages/FAQ";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Enquiry from "../Pages/enquiry";
import MyOrders from "../Pages/MyOrders";
import Privacy from "../Pages/Privacy";
import Terms from "../Pages/Terms";
import Application from "../Pages/Application";
import AdminLayout from "../Pages/Admin/AdminLayout";
import ForgotPassword from "../Pages/ForgotPassword";

function AdminGuard({ children }) {
  const { isAdmin, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/products" element={<Navigate to="/shop" replace />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/application" element={<Application />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/enquiry" element={<Enquiry />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/admin/*" element={
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
