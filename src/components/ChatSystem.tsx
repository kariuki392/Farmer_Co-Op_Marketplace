import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, X, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface Chat {
  id: string;
  participants: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChat?: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, selectedChat }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      participants: [
        { id: '1', name: 'Metro Supermarket', role: 'buyer' },
        { id: '2', name: 'Kikuyu Farmers Co-op', role: 'farmer' }
      ],
      lastMessage: {
        id: '1',
        senderId: '1',
        senderName: 'Metro Supermarket',
        content: 'Can you deliver 2000kg of maize by Friday?',
        timestamp: new Date(),
        type: 'text'
      },
      unreadCount: 2
    },
    {
      id: '2',
      participants: [
        { id: '3', name: 'Fresh Foods Ltd', role: 'buyer' },
        { id: '2', name: 'Kikuyu Farmers Co-op', role: 'farmer' }
      ],
      lastMessage: {
        id: '2',
        senderId: '3',
        senderName: 'Fresh Foods Ltd',
        content: 'Quality looks great! Proceeding with order.',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      unreadCount: 0
    }
  ]);

  const [activeChat, setActiveChat] = useState<string | null>(selectedChat || null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Metro Supermarket',
      content: 'Hi! I\'m interested in your yellow maize listing.',
      timestamp: new Date(Date.now() - 7200000),
      type: 'text'
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'Kikuyu Farmers Co-op',
      content: 'Hello! Thank you for your interest. We have 5000kg available at Ksh.42/kg.',
      timestamp: new Date(Date.now() - 7000000),
      type: 'text'
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Metro Supermarket',
      content: 'Can you deliver 2000kg of maize by Friday?',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '2',
      senderName: user?.name || 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[600px] flex overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => {
              const otherParticipant = chat.participants.find(p => p.id !== user?.id);
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    activeChat === chat.id ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{otherParticipant?.name}</h4>
                    {chat.unreadCount > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage?.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {chat.lastMessage && formatTime(chat.lastMessage.timestamp)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Metro Supermarket</h4>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;