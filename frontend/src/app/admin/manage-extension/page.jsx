'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageExtension = () => {
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    fetchExtensions();
  }, []);

  const fetchExtensions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/extension/getall');
      setExtensions(response.data);
    } catch (error) {
      toast.error('Failed to fetch extensions.');
    }
  };

  const deleteExtension = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/extension/delete/${id}`);
      toast.success('Extension deleted successfully.');
      fetchExtensions();
    } catch (error) {
      toast.error('Failed to delete extension.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Manage Extensions</h1>
      {extensions.length === 0 ? (
        <p>No extensions found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {extensions.map((extension) => (
              <tr key={extension._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{extension.name}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{extension.description}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{extension.version}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deleteExtension(extension._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageExtension;