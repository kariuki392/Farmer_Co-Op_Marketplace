import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, TrendingUp, DollarSign, Users, Calendar, ArrowUpRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FarmerDashboard = () => {
  const { user } = useAuth();

  const recentProducts = [
    { id: 1, name: 'Yellow Maize', quantity: '2,500 kg', price: 'Ksh.45/kg', status: 'Active', orders: 12 },
    { id: 2, name: 'Fresh Milk', quantity: '500 L', price: 'Ksh.80/L', status: 'Active', orders: 8 },
    { id: 3, name: 'Tomatoes', quantity: '300 kg', price: 'Ksh.120/kg', status: 'Low Stock', orders: 5 },
  ];

  const recentOrders = [
    { id: 1, buyer: 'Metro Supermarket', product: 'Yellow Maize', quantity: '500 kg', value: 'Ksh.22,500', status: 'Pending Payment' },
    { id: 2, buyer: 'Fresh Foods Ltd', product: 'Fresh Milk', quantity: '100 L', value: 'Ksh.8,000', status: 'In Transit' },
    { id: 3, buyer: 'Local Restaurant', product: 'Tomatoes', quantity: '50 kg', value: 'Ksh.6,000', status: 'Delivered' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Here's what's happening with your cooperative today.</p>
          </div>
          <Link
            to="/add-product"
            className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">Ksh.2.4M</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">18</p>
              <p className="text-blue-600 text-sm mt-1">3 new this week</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
              <p className="text-purple-600 text-sm mt-1">25 pending</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Buyers</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">47</p>
              <p className="text-amber-600 text-sm mt-1">8 new buyers</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Products</h2>
            <Link to="/marketplace" className="text-green-600 hover:text-green-700 font-medium text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.quantity} • {product.price}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{product.orders} orders</span>
                  </div>
                </div>
                <div className="text-right">
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Edit
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
            <Link to="/orders" className="text-green-600 hover:text-green-700 font-medium text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.buyer}</h3>
                    <p className="text-sm text-gray-600">{order.product} • {order.quantity}</p>
                    <p className="text-sm font-medium text-green-600 mt-1">{order.value}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Alerts */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">Price Alert</h3>
            <p className="text-blue-800">
              Maize prices are expected to rise by 15% next week based on our AI predictions. 
              Consider adjusting your pricing strategy or holding stock.
            </p>
            <Link 
              to="/analytics" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-3"
            >
              View Price Trends
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;