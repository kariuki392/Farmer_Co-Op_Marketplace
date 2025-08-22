import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, ShoppingCart, BarChart3, Package, LogOut, Menu, X, Bell, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import NotificationSystem from './NotificationSystem';
import ChatSystem from './ChatSystem';
import ShoppingCartComponent from './ShoppingCart';
import UserProfile from './UserProfile';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
            <Sprout className="h-8 w-8" />
            <span className="text-xl font-bold">FarmCoop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Marketplace
            </Link>
            
            {user && (
              <>
                {user.role === 'farmer' && (
                  <Link to="/farmer-dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                {user.role === 'buyer' && (
                  <Link to="/buyer-dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <Link to="/orders" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link to="/analytics" className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </>
            )}
            
            {user && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                <button
                  onClick={() => setShowChat(true)}
                  className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => setShowCart(true)}
                  className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full capitalize">
                    {user.role}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/marketplace"
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                onClick={closeMenu}
              >
                Marketplace
              </Link>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full capitalize">
                      {user.role}
                    </span>
                  </div>
                  
                  {user.role === 'farmer' && (
                    <Link
                      to="/farmer-dashboard"
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                      onClick={closeMenu}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  {user.role === 'buyer' && (
                    <Link
                      to="/buyer-dashboard"
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                      onClick={closeMenu}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  
                  <Link
                    to="/orders"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                    onClick={closeMenu}
                  >
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                  
                  <Link
                    to="/analytics"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                    onClick={closeMenu}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <NotificationSystem isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ChatSystem isOpen={showChat} onClose={() => setShowChat(false)} />
      <ShoppingCartComponent isOpen={showCart} onClose={() => setShowCart(false)} />
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </nav>
  );
};

export default Navbar;