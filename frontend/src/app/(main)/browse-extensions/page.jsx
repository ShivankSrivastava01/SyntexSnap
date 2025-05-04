import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BrowseExtensions = () => {
  const [extensions, setExtensions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExtensions, setFilteredExtensions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    fetchExtensions();
    fetchFilters();
  }, []);

  useEffect(() => {
    const filtered = extensions.filter((extension) => {
      const matchesSearch = extension.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? extension.category === selectedCategory : true;
      const matchesTechStack = selectedTechStack ? extension.techStack.includes(selectedTechStack) : true;
      const matchesRating = selectedRating ? extension.averageRating >= selectedRating : true;
      return matchesSearch && matchesCategory && matchesTechStack && matchesRating;
    });
    setFilteredExtensions(filtered);
  }, [searchTerm, selectedCategory, selectedTechStack, selectedRating, extensions]);

  const fetchExtensions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/extension/getall');
      setExtensions(response.data);
    } catch (error) {
      console.error('Failed to fetch extensions:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/extension/filters');
      setCategories(response.data.categories);
      setTechStacks(response.data.techStacks);
    } catch (error) {
      console.error('Failed to fetch filters:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Browse Extensions</h1>
      <input
        type="text"
        placeholder="Search extensions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div className="flex space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={selectedTechStack}
          onChange={(e) => setSelectedTechStack(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Tech Stacks</option>
          {techStacks.map((techStack) => (
            <option key={techStack} value={techStack}>{techStack}</option>
          ))}
        </select>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={0}>All Ratings</option>
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>{rating} Stars & Up</option>
          ))}
        </select>
      </div>
      {filteredExtensions.length === 0 ? (
        <p>No extensions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExtensions.map((extension) => (
            <div key={extension._id} className="p-4 border border-gray-300 rounded-md shadow-sm">
              <h2 className="text-lg font-bold">{extension.name}</h2>
              <p className="text-sm text-gray-600">{extension.description}</p>
              <p className="text-sm text-gray-500">Category: {extension.category}</p>
              <p className="text-sm text-gray-500">Tech Stack: {extension.techStack.join(', ')}</p>
              <p className="text-sm text-gray-500">Rating: {extension.averageRating.toFixed(1)}</p>
              <Link href={`/view-extension/${extension._id}`}>
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseExtensions;