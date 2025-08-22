import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, X, AlertCircle, Camera } from 'lucide-react';

const ProductListingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    unit: 'kg',
    quantity: '',
    harvestDate: '',
    location: '',
    organic: false,
    minimumOrder: '',
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'cereals', label: 'Cereals & Grains' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'coffee', label: 'Coffee & Tea' },
    { value: 'legumes', label: 'Legumes' },
    { value: 'spices', label: 'Spices & Herbs' },
  ];

  const units = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'L', label: 'Liters (L)' },
    { value: 'bags', label: 'Bags' },
    { value: 'crates', label: 'Crates' },
    { value: 'bunches', label: 'Bunches' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageAdd = () => {
    // In a real app, this would open file picker
    const sampleImages = [
      'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setImages(prev => [...prev, randomImage]);
  };

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.quantity || Number(formData.quantity) <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.harvestDate) newErrors.harvestDate = 'Harvest date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.minimumOrder || Number(formData.minimumOrder) <= 0) newErrors.minimumOrder = 'Minimum order is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    navigate('/farmer-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">List your produce for buyers to discover and purchase</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Premium Yellow Maize"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your product quality, farming practices, and any special features..."
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Quantity</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Unit (Ksh.) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="45.00"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {units.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.quantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1000"
                />
                {errors.quantity && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.quantity}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Quantity *
              </label>
              <input
                type="number"
                name="minimumOrder"
                value={formData.minimumOrder}
                onChange={handleInputChange}
                min="1"
                className={`w-full max-w-xs px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.minimumOrder ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="50"
              />
              {errors.minimumOrder && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.minimumOrder}
                </p>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harvest Date *
                </label>
                <input
                  type="date"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.harvestDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.harvestDate && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.harvestDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Kiambu County"
                />
                {errors.location && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  This product is organically grown (certified)
                </span>
              </label>
            </div>
          </div>

          {/* Product Images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={handleImageAdd}
                  className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Add Photo</span>
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Add up to 5 high-quality photos of your product. Good photos increase buyer interest.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/farmer-dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Publish Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductListingForm;