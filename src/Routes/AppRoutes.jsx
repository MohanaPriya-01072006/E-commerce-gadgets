import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import AdminLayout from "../Pages/Admin/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main */}
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />

      {/* Shop */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/products" element={<Navigate to="/shop" replace />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* Info pages */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/enquiry" element={<Enquiry />} />

      {/* User */}
      <Route path="/my-orders" element={<MyOrders />} />

      {/* Admin Panel */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
