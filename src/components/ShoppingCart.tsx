import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X, CreditCard } from 'lucide-react';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  image: string;
  available: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      productId: '1',
      name: 'Premium Yellow Maize',
      farmer: 'Kikuyu Farmers Cooperative',
      price: 42,
      unit: 'kg',
      quantity: 500,
      minOrder: 100,
      available: 5000,
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      productId: '2',
      name: 'Fresh Cow Milk',
      farmer: 'Dairy Best Cooperative',
      price: 75,
      unit: 'L',
      quantity: 100,
      minOrder: 50,
      available: 1200,
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const quantity = Math.max(item.minOrder, Math.min(newQuantity, item.available));
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalValue = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
              {cartItems.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {cartItems.length > 0 ? (
            <div className="p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.farmer}</p>
                    <p className="text-sm text-green-600 font-medium">Ksh.{item.price}/{item.unit}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 50)}
                      disabled={item.quantity <= item.minOrder}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <div className="text-center">
                      <div className="font-medium">{item.quantity.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{item.unit}</div>
                    </div>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 50)}
                      disabled={item.quantity >= item.available}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      Ksh.{(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some products from the marketplace to get started</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-medium">{getTotalItems().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-green-600">Ksh.{getTotalValue().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartComponent;