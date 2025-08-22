import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, TrendingDown, Clock, Star, ArrowUpRight, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BuyerDashboard = () => {
  const { user } = useAuth();

  const recommendedProducts = [
    { id: 1, name: 'Premium Yellow Maize', farmer: 'Kikuyu Farmers Co-op', price: 'Ksh.42/kg', rating: 4.8, available: '5,000 kg', location: 'Kiambu County' },
    { id: 2, name: 'Fresh Cow Milk', farmer: 'Dairy Best Co-op', price: 'Ksh.75/L', rating: 4.9, available: '1,200 L', location: 'Nakuru County' },
    { id: 3, name: 'Organic Tomatoes', farmer: 'Green Valley Co-op', price: 'Ksh.110/kg', rating: 4.7, available: '800 kg', location: 'Meru County' },
  ];

  const recentOrders = [
    { id: 1, product: 'Yellow Maize', farmer: 'Kikuyu Farmers Co-op', quantity: '1,000 kg', value: 'Ksh.45,000', status: 'In Transit', eta: '2 days' },
    { id: 2, product: 'Fresh Milk', farmer: 'Dairy Best Co-op', quantity: '200 L', value: 'Ksh.16,000', status: 'Delivered', eta: 'Completed' },
    { id: 3, product: 'Coffee Beans', farmer: 'Highlands Co-op', quantity: '100 kg', value: 'Ksh.35,000', status: 'Processing', eta: '3 days' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Discover fresh produce from verified farmer cooperatives.</p>
          </div>
          <Link
            to="/marketplace"
            className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Browse Marketplace
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Purchases</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">Ksh.1.8M</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                5% savings this month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
              <p className="text-amber-600 text-sm mt-1">3 in transit</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Favorite Farmers</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
              <p className="text-purple-600 text-sm mt-1">2 new partnerships</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Delivery</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">2.3</p>
              <p className="text-green-600 text-sm mt-1">days</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recommended Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
            <Link to="/marketplace" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{product.farmer}</p>
                <p className="text-sm text-gray-500 mb-2">{product.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500 ml-2">{product.available} available</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/orders" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.product}</h3>
                    <p className="text-sm text-gray-600">{order.farmer}</p>
                    <p className="text-sm text-gray-600">{order.quantity} • {order.value}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'In Transit'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{order.eta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <TrendingDown className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Market Opportunity</h3>
            <p className="text-gray-700 mb-3">
              Tomato prices are expected to drop by 20% over the next two weeks due to increased harvest season. 
              This could be a great time to stock up for your business needs.
            </p>
            <Link 
              to="/analytics" 
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              View Market Trends
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;