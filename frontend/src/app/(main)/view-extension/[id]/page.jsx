'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewExtension = () => {
  const { id } = useParams();
  const [extension, setExtension] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    if (id && userData) {
      fetchExtension();
      checkIfFavorite(userData._id);
    }
  }, [id]);

  const fetchExtension = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/extension/getbyid/${id}`);
      setExtension(response.data);
    } catch (error) {
      console.error('Failed to fetch extension:', error);
      toast.error('Failed to load extension details');
    }
  };

  const checkIfFavorite = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/favorites/${userId}`);
      setIsFavorite(response.data.some(fav => fav._id === id));
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error('Please log in to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/user/favorites/${user._id}/${id}`);
        toast.success('Removed from favorites');
      } else {
        await axios.post(`http://localhost:5000/user/favorites/${user._id}/${id}`);
        toast.success('Added to favorites');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/rating/add', {
        extensionId: id,
        rating,
        comment,
        userId: user?._id
      });
      toast.success('Review added successfully');
      setRating(0);
      setComment('');
      fetchExtension();
    } catch (error) {
      console.error('Failed to add rating:', error);
      toast.error('Failed to add review');
    }
  };

  if (!extension) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{extension.name}</h1>
          <p className="text-sm text-gray-600">{extension.description}</p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full ${
            isFavorite 
              ? 'text-red-500 hover:text-red-700' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Heart className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Category: {extension.category}</p>
          <p className="text-sm text-gray-500">Tech Stack: {extension.techStack?.join(', ')}</p>
          <p className="text-sm text-gray-500">Publisher: {extension.publisher}</p>
          <p className="text-sm text-gray-500">Rating: {extension.averageRating?.toFixed(1) || 'No ratings yet'}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Reviews</h2>
        {extension.reviews?.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {extension.reviews?.map((review, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded-md">
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">- User ID: {review.userId}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {user && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Add Your Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewExtension;