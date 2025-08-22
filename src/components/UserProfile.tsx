import React, { useState } from 'react';
import { User, Star, MapPin, Phone, Mail, Edit, Camera, Shield, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+254 700 123 456',
    location: 'Kiambu County, Kenya',
    bio: 'Experienced farmer cooperative with 15+ years in sustainable agriculture. Specializing in maize, dairy, and organic vegetables.',
    avatar: '',
    businessName: 'Kikuyu Farmers Cooperative',
    businessType: 'Agricultural Cooperative',
    established: '2008',
    members: '150+ farmers',
    certifications: ['Organic Certified', 'Fair Trade', 'ISO 22000']
  });

  const [reviews] = useState([
    {
      id: '1',
      reviewer: 'Metro Supermarket',
      rating: 5,
      comment: 'Excellent quality produce and reliable delivery. Highly recommended!',
      date: '2024-01-10',
      product: 'Yellow Maize'
    },
    {
      id: '2',
      reviewer: 'Fresh Foods Ltd',
      rating: 4,
      comment: 'Good quality milk, consistent supply. Minor delay in one delivery.',
      date: '2024-01-05',
      product: 'Fresh Milk'
    },
    {
      id: '3',
      reviewer: 'School Feeding Program',
      rating: 5,
      comment: 'Perfect for our bulk requirements. Great communication throughout.',
      date: '2023-12-28',
      product: 'White Maize'
    }
  ]);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <User className="h-12 w-12" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-green-100">({reviews.length} reviews)</span>
                </div>
              </div>
              <p className="text-green-100 mb-1">{profileData.businessName}</p>
              <div className="flex items-center text-green-100">
                <MapPin className="h-4 w-4 mr-1" />
                {profileData.location}
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors inline-flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="p-6 grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="font-medium">{profileData.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="font-medium">{profileData.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
                        <p className="text-sm text-gray-600">{review.product}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Business Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Business Type</p>
                  <p className="font-medium">{profileData.businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Established</p>
                  <p className="font-medium">{profileData.established}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Members</p>
                  <p className="font-medium">{profileData.members}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-600" />
                Certifications
              </h3>
              <div className="space-y-2">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-medium">Ksh.2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orders Completed</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">On-time Delivery</span>
                  <span className="font-medium">95%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;