import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, BarChart, DonutChart } from '../components/AnalyticsCharts';

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data - in real app, this would come from API
  const salesData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
  ];

  const topProducts = [
    { name: 'Yellow Maize', revenue: 'Ksh.156,000', quantity: '3,700 kg', growth: '+12%' },
    { name: 'Fresh Milk', revenue: 'Ksh.89,000', quantity: '1,180 L', growth: '+8%' },
    { name: 'Roma Tomatoes', revenue: 'Ksh.67,000', quantity: '610 kg', growth: '+15%' },
    { name: 'Coffee Beans', revenue: 'Ksh.45,000', quantity: '130 kg', growth: '+22%' },
  ];

  const priceData = [
    { product: 'Maize', current: 42, predicted: 48, change: '+14%' },
    { product: 'Tomatoes', current: 110, predicted: 95, change: '-14%' },
    { product: 'Milk', current: 75, predicted: 78, change: '+4%' },
    { product: 'Coffee', current: 350, predicted: 375, change: '+7%' },
  ];

  const buyerInsights = [
    { name: 'Metro Supermarket', orders: 12, value: 'Ksh.234,000', trend: 'up' },
    { name: 'Fresh Foods Ltd', orders: 8, value: 'Ksh.156,000', trend: 'up' },
    { name: 'School Program', orders: 15, value: 'Ksh.189,000', trend: 'stable' },
    { name: 'Local Restaurants', orders: 6, value: 'Ksh.78,000', trend: 'down' },
  ];

  const categoryData = [
    { label: 'Cereals', value: 45, color: '#10b981' },
    { label: 'Dairy', value: 25, color: '#3b82f6' },
    { label: 'Vegetables', value: 20, color: '#f59e0b' },
    { label: 'Fruits', value: 10, color: '#ef4444' },
  ];

  const monthlyOrders = [
    { label: 'Jan', value: 23, change: 12 },
    { label: 'Feb', value: 28, change: 8 },
    { label: 'Mar', value: 25, change: -5 },
    { label: 'Apr', value: 32, change: 15 },
    { label: 'May', value: 29, change: -3 },
    { label: 'Jun', value: 35, change: 18 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">
            {user?.role === 'farmer' 
              ? 'Track your sales performance and market trends'
              : 'Monitor your purchasing patterns and market opportunities'
            }
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">Ksh.338K</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +18% vs last month
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
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">172</p>
              <p className="text-blue-600 text-sm mt-1">32 this week</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Buyers</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">47</p>
              <p className="text-purple-600 text-sm mt-1">8 new this month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">Ksh.1,965</p>
              <p className="text-amber-600 text-sm mt-1">+5% from last month</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <LineChart 
          data={salesData} 
          title="Sales Trend (Ksh.)" 
          color="green" 
        />

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{product.revenue}</div>
                  <div className="text-green-600 text-sm font-medium">{product.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <DonutChart 
          data={categoryData} 
          title="Sales by Category" 
        />
        
        {/* Monthly Orders */}
        <BarChart 
          data={monthlyOrders} 
          title="Monthly Orders" 
          color="blue" 
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        {/* Price Predictions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Price Predictions</h3>
          <p className="text-gray-600 mb-4 text-sm">Next 30 days forecast based on market trends</p>
          
          <div className="space-y-4">
            {priceData.map((item) => (
              <div key={item.product} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{item.product}</h4>
                  <p className="text-sm text-gray-600">Current: Ksh.{item.current}/kg</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">Ksh.{item.predicted}/kg</div>
                  <div className={`text-sm font-medium ${
                    item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change.startsWith('+') ? <TrendingUp className="h-4 w-4 inline mr-1" /> : <TrendingDown className="h-4 w-4 inline mr-1" />}
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Insights */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {user?.role === 'farmer' ? 'Top Buyers' : 'Your Suppliers'}
          </h3>
          
          <div className="space-y-4">
            {buyerInsights.map((buyer) => (
              <div key={buyer.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{buyer.name}</h4>
                  <p className="text-sm text-gray-600">{buyer.orders} orders</p>
                </div>
                <div className="text-right flex items-center space-x-3">
                  <div>
                    <div className="font-semibold text-gray-900">{buyer.value}</div>
                    <div className={`text-sm flex items-center ${
                      buyer.trend === 'up' ? 'text-green-600' : 
                      buyer.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {buyer.trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                      {buyer.trend === 'down' && <TrendingDown className="h-4 w-4 mr-1" />}
                      {buyer.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full mr-1"></div>}
                      {buyer.trend}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Market Insights for This Week
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Seasonal Opportunity</h4>
            <p className="text-sm text-gray-600">
              Tomato demand is expected to increase by 25% next week due to school reopening. 
              Consider increasing your harvest if possible.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Price Alert</h4>
            <p className="text-sm text-gray-600">
              Maize prices are stabilizing after the recent fluctuation. This could be a good time 
              to secure long-term contracts with buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;