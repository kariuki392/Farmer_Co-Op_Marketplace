import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Shield, Truck, BarChart3, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect Farmers to Markets
            <span className="block text-green-200">Directly & Efficiently</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            A digital marketplace that eliminates middlemen, provides fair prices, and connects farmer cooperatives directly with buyers across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors inline-flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/marketplace"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FarmCoop?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform addresses the key challenges in agricultural supply chains with innovative solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Connection</h3>
              <p className="text-gray-600">
                Connect farmer cooperatives directly with buyers, eliminating costly middlemen and ensuring fair prices for both parties.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Price Prediction</h3>
              <p className="text-gray-600">
                Advanced AI algorithms predict future price trends, helping farmers and buyers make informed decisions about when to sell or buy.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Escrow-style payment system ensures secure transactions with money released only after successful delivery confirmation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Logistics Integration</h3>
              <p className="text-gray-600">
                Integrated logistics network with real-time tracking, connecting trusted transporters for efficient farm-to-market delivery.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Analytics</h3>
              <p className="text-gray-600">
                Comprehensive analytics dashboard showing sales history, profitable crops, and market demand trends for better planning.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wide Reach</h3>
              <p className="text-gray-600">
                Access to diverse buyers including supermarkets, restaurants, schools, and households across multiple regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200">Farmer Cooperatives</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-green-200">Active Buyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Ksh.50M+</div>
              <div className="text-green-200">Trade Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-green-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of farmers and buyers who are already benefiting from our platform.
          </p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors inline-flex items-center"
          >
            Start Trading Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;