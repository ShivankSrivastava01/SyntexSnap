import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const ViewExtension = () => {
  const { id } = useParams();
  const [extension, setExtension] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchExtension();
    }
  }, [id]);

  const fetchExtension = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/extension/getbyid/${id}`);
      setExtension(response.data);
    } catch (error) {
      console.error('Failed to fetch extension:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/rating/add', {
        extensionId: id,
        rating,
        comment,
      });
      console.log('Rating added:', response.data);
      setRating(0);
      setComment('');
      fetchExtension(); // Refresh extension details
    } catch (error) {
      console.error('Failed to add rating:', error);
    }
  };

  if (!extension) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">{extension.name}</h1>
      <p className="text-sm text-gray-600">{extension.description}</p>
      <p className="text-sm text-gray-500">Category: {extension.category}</p>
      <p className="text-sm text-gray-500">Tech Stack: {extension.techStack.join(', ')}</p>
      <p className="text-sm text-gray-500">Publisher: {extension.publisher}</p>
      <p className="text-sm text-gray-500">Rating: {extension.averageRating.toFixed(1)}</p>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Reviews</h2>
        {extension.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {extension.reviews.map((review, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded-md">
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">- User ID: {review.userId}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
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
    </div>
  );
};

export default ViewExtension;