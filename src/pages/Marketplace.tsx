import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, ShoppingCart, Heart, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  farmer: string;
  location: string;
  price: number;
  unit: string;
  available: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  freshness: string;
  organic: boolean;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cereals', name: 'Cereals' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'coffee', name: 'Coffee' },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'kiambu', name: 'Kiambu County' },
    { id: 'nakuru', name: 'Nakuru County' },
    { id: 'meru', name: 'Meru County' },
    { id: 'uasin-gishu', name: 'Uasin Gishu County' },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Yellow Maize',
      farmer: 'Kikuyu Farmers Cooperative',
      location: 'Kiambu County',
      price: 42,
      unit: 'kg',
      available: 5000,
      rating: 4.8,
      reviews: 124,
      category: 'cereals',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400',
      freshness: 'Harvested 2 days ago',
      organic: true
    },
    {
      id: 2,
      name: 'Fresh Cow Milk',
      farmer: 'Dairy Best Cooperative',
      location: 'Nakuru County',
      price: 75,
      unit: 'L',
      available: 1200,
      rating: 4.9,
      reviews: 89,
      category: 'dairy',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      freshness: 'Milked this morning',
      organic: false
    },
    {
      id: 3,
      name: 'Organic Roma Tomatoes',
      farmer: 'Green Valley Cooperative',
      location: 'Meru County',
      price: 110,
      unit: 'kg',
      available: 800,
      rating: 4.7,
      reviews: 67,
      category: 'vegetables',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
      freshness: 'Picked yesterday',
      organic: true
    },
    {
      id: 4,
      name: 'AA Grade Coffee Beans',
      farmer: 'Highlands Coffee Cooperative',
      location: 'Kiambu County',
      price: 350,
      unit: 'kg',
      available: 200,
      rating: 4.9,
      reviews: 156,
      category: 'coffee',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400',
      freshness: 'Roasted weekly',
      organic: true
    },
    {
      id: 5,
      name: 'Sweet Bananas',
      farmer: 'Tropical Fruits Cooperative',
      location: 'Meru County',
      price: 65,
      unit: 'kg',
      available: 1500,
      rating: 4.6,
      reviews: 92,
      category: 'fruits',
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
      freshness: 'Tree-ripened',
      organic: false
    },
    {
      id: 6,
      name: 'White Maize',
      farmer: 'Rift Valley Cooperative',
      location: 'Uasin Gishu County',
      price: 38,
      unit: 'kg',
      available: 8000,
      rating: 4.5,
      reviews: 203,
      category: 'cereals',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400',
      freshness: 'Harvested last week',
      organic: false
    }
  ];

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           product.location.toLowerCase().includes(selectedLocation.replace('-', ' '));
    const matchesPrice = (!priceRange.min || product.price >= Number(priceRange.min)) &&
                        (!priceRange.max || product.price <= Number(priceRange.max));
    const matchesOrganic = !organicOnly || product.organic;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesOrganic;
  });

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Marketplace</h1>
        <p className="text-gray-600">Discover fresh produce directly from farmer cooperatives</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products, farmers, or cooperatives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="lg:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (Ksh.)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Organic Only</span>
              </label>
            </div>
            
            <div className="flex items-end space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLocation('all');
              setPriceRange({ min: '', max: '' });
              setOrganicOnly(false);
            }}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <div key={product.id} className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className={viewMode === 'grid' ? "w-full h-48 object-cover" : "w-48 h-32 object-cover"}
              />
              {product.organic && (
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Organic
                </span>
              )}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-colors ${
                    favorites.includes(product.id) ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
                <div className="bg-white bg-opacity-90 rounded-full p-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? "p-6" : "flex-1 p-4"}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">{product.farmer}</p>
              
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {product.location}
              </div>

              <div className="flex items-center text-green-600 text-sm mb-3">
                <Clock className="h-4 w-4 mr-1" />
                {product.freshness}
              </div>

              <div className={`flex items-center justify-between mb-4 ${viewMode === 'list' ? 'flex-col items-start space-y-2' : ''}`}>
                <div>
                  <span className="text-2xl font-bold text-gray-900">Ksh.{product.price}</span>
                  <span className="text-gray-500">/{product.unit}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.available.toLocaleString()} {product.unit} available
                </span>
              </div>

              <div className={`flex items-center justify-between ${viewMode === 'list' ? 'flex-col items-start space-y-2' : ''}`}>
                <span className="text-sm text-gray-500">
                  {product.reviews} reviews
                </span>
                <div className="flex space-x-2">
                  <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {viewMode === 'list' ? 'Add to Cart' : 'Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or browse all products</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;