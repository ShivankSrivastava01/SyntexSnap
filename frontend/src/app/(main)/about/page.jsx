import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              About VS Code Marketplace
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your one-stop destination for discovering and managing VS Code extensions
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Developers Worldwide
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're dedicated to helping developers enhance their coding experience by providing easy access to high-quality VS Code extensions.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Curated Collection</h3>
              <p className="mt-2 text-base text-gray-500">
                Discover hand-picked extensions that have been thoroughly vetted for quality and security.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Easy Installation</h3>
              <p className="mt-2 text-base text-gray-500">
                One-click installation process to get your favorite extensions up and running in seconds.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Community Driven</h3>
              <p className="mt-2 text-base text-gray-500">
                Built by developers, for developers. Join our growing community of extension creators and users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div>
              <h3 className="text-4xl font-bold text-white">10,000+</h3>
              <p className="mt-2 text-indigo-100">Extensions Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white">1M+</h3>
              <p className="mt-2 text-indigo-100">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white">500+</h3>
              <p className="mt-2 text-indigo-100">Daily Installs</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to enhance your VS Code experience?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Join thousands of developers who have already discovered the power of our marketplace.
          </p>
          <div className="mt-8">
            <a
              href="/extensions"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Extensions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;