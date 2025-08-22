import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, TrendingUp, Package, MessageCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'price' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      message: 'Metro Supermarket ordered 500kg of Yellow Maize',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: '2',
      type: 'price',
      title: 'Price Alert',
      message: 'Tomato prices expected to rise by 15% next week',
      timestamp: new Date(Date.now() - 1800000),
      read: false
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Fresh Foods Ltd: "Can you deliver by Friday?"',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: '4',
      type: 'system',
      title: 'Payment Received',
      message: 'Payment of Ksh.22,500 has been released to your account',
      timestamp: new Date(Date.now() - 7200000),
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'price':
        return <TrendingUp className="h-5 w-5 text-amber-600" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-100"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100"
                            title="Delete"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;