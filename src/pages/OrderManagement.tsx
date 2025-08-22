import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, MessageCircle, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const OrderManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = [
    {
      id: 'ORD-2024-001',
      product: 'Premium Yellow Maize',
      farmer: 'Kikuyu Farmers Cooperative',
      buyer: 'Metro Supermarket Chain',
      quantity: '1,500 kg',
      unitPrice: 'Ksh.42/kg',
      totalValue: 'Ksh.63,000',
      status: 'confirmed',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-18',
      paymentStatus: 'escrow',
      location: 'Kiambu to Nairobi',
      transporter: 'Swift Logistics',
      trackingNumber: 'SL2024001',
      notes: 'Urgent delivery required for weekend promotion'
    },
    {
      id: 'ORD-2024-002',
      product: 'Fresh Cow Milk',
      farmer: 'Dairy Best Cooperative',
      buyer: 'Fresh Foods Restaurant',
      quantity: '200 L',
      unitPrice: 'Ksh.75/L',
      totalValue: 'Ksh.15,000',
      status: 'in-transit',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-16',
      paymentStatus: 'escrow',
      location: 'Nakuru to Nairobi',
      transporter: 'Cool Chain Transport',
      trackingNumber: 'CCT2024005',
      notes: 'Requires refrigerated transport'
    },
    {
      id: 'ORD-2024-003',
      product: 'Organic Roma Tomatoes',
      farmer: 'Green Valley Cooperative',
      buyer: 'Healthy Meals Catering',
      quantity: '300 kg',
      unitPrice: 'Ksh.110/kg',
      totalValue: 'Ksh.33,000',
      status: 'delivered',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-12',
      paymentStatus: 'completed',
      location: 'Meru to Nairobi',
      transporter: 'FarmFresh Delivery',
      trackingNumber: 'FFD2024012',
      notes: 'Delivered in perfect condition'
    },
    {
      id: 'ORD-2024-004',
      product: 'White Maize',
      farmer: 'Rift Valley Cooperative',
      buyer: 'School Feeding Program',
      quantity: '2,000 kg',
      unitPrice: 'Ksh.38/kg',
      totalValue: 'Ksh.76,000',
      status: 'pending',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-20',
      paymentStatus: 'pending',
      location: 'Uasin Gishu to Multiple Schools',
      transporter: 'To be assigned',
      trackingNumber: 'Pending',
      notes: 'Bulk delivery to multiple locations required'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'escrow':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5" />;
      case 'in-transit':
        return <Truck className="h-5 w-5" />;
      case 'delivered':
        return <Package className="h-5 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">
          {user?.role === 'farmer' ? 'Manage your sales and deliveries' : 'Track your purchases and deliveries'}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200 px-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'all', label: 'All Orders', count: orders.length },
              { key: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
              { key: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
              { key: 'in-transit', label: 'In Transit', count: orders.filter(o => o.status === 'in-transit').length },
              { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        <div className="p-6">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                          <p className="text-gray-600">{order.product}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {user?.role === 'farmer' ? 'Buyer' : 'Farmer'}
                          </p>
                          <p className="font-medium">
                            {user?.role === 'farmer' ? order.buyer : order.farmer}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Quantity & Value</p>
                          <p className="font-medium">{order.quantity}</p>
                          <p className="text-green-600 font-semibold">{order.totalValue}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Delivery Date</p>
                          <p className="font-medium">{order.deliveryDate}</p>
                          <p className="text-sm text-gray-600">{order.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Payment Status</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{order.transporter}</p>
                        </div>
                      </div>
                      
                      {order.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      
                      <div className="flex space-x-2">
                        <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">
                {activeTab === 'all' 
                  ? 'You don\'t have any orders yet.'
                  : `No orders with ${activeTab} status.`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Order ID:</dt>
                      <dd className="font-medium">{selectedOrder.id}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Product:</dt>
                      <dd className="font-medium">{selectedOrder.product}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Quantity:</dt>
                      <dd className="font-medium">{selectedOrder.quantity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Unit Price:</dt>
                      <dd className="font-medium">{selectedOrder.unitPrice}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Total Value:</dt>
                      <dd className="font-semibold text-green-600">{selectedOrder.totalValue}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Order Date:</dt>
                      <dd className="font-medium">{selectedOrder.orderDate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Delivery Date:</dt>
                      <dd className="font-medium">{selectedOrder.deliveryDate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Route:</dt>
                      <dd className="font-medium">{selectedOrder.location}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Transporter:</dt>
                      <dd className="font-medium">{selectedOrder.transporter}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Tracking:</dt>
                      <dd className="font-medium">{selectedOrder.trackingNumber}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                <div className="flex space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    Order {selectedOrder.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    Payment {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
              
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;