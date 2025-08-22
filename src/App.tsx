import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Marketplace from './pages/Marketplace';
import ProductListingForm from './pages/ProductListingForm';
import OrderManagement from './pages/OrderManagement';
import Analytics from './pages/Analytics';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/farmer-dashboard" 
          element={user?.role === 'farmer' ? <FarmerDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/buyer-dashboard" 
          element={user?.role === 'buyer' ? <BuyerDashboard /> : <Navigate to="/login" />} 
        />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route 
          path="/add-product" 
          element={user?.role === 'farmer' ? <ProductListingForm /> : <Navigate to="/login" />} 
        />
        <Route path="/orders" element={user ? <OrderManagement /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;