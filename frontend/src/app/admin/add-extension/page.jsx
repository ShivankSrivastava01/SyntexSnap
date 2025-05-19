'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const categories = [
  'Development',
  'Programming Languages',
  'Snippets',
  'Themes',
  'Debuggers',
  'Formatters',
  'Testing',
  'Other'
];

const AddExtension = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      version: '',
      category: '',
      techStack: '',
      publisher: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Extension name is required')
        .min(3, 'Extension name must be at least 3 characters long'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long'),
      version: Yup.string()
        .required('Version is required')
        .matches(/^\d+\.\d+\.\d+$/, 'Version must follow semantic versioning (e.g., 1.0.0)'),
      category: Yup.string()
        .required('Category is required')
        .oneOf(categories, 'Please select a valid category'),
      techStack: Yup.string()
        .required('Tech stack is required')
        .min(2, 'Please enter at least one technology'),
      publisher: Yup.string()
        .required('Publisher name is required')
        .min(2, 'Publisher name must be at least 2 characters long'),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        
        // Format the data to match the backend schema
        const formData = {
          ...values,
          techStack: values.techStack.split(',').map(tech => tech.trim()).filter(tech => tech), // Remove empty strings
        };

        console.log('Submitting extension data:', formData); // Debug log

        const response = await axios.post('http://localhost:5000/extension/add', formData);
        
        if (response.data) {
          toast.success(`Extension "${response.data.name}" added successfully!`);
          formik.resetForm();
        }
      } catch (error) {
        console.error('Error details:', error.response || error); // Debug log
        
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.error 
          || error.message 
          || 'Failed to add extension';
          
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Extension</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Extension Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700">Version</label>
            <input
              id="version"
              name="version"
              type="text"
              placeholder="1.0.0"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.version}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.version && formik.errors.version ? (
              <p className="text-red-500 text-sm">{formik.errors.version}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">Publisher</label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.publisher}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.publisher && formik.errors.publisher ? (
              <p className="text-red-500 text-sm">{formik.errors.publisher}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Tech Stack</label>
          <input
            id="techStack"
            name="techStack"
            type="text"
            placeholder="JavaScript, React, Node.js (comma-separated)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.techStack}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.techStack && formik.errors.techStack ? (
            <p className="text-red-500 text-sm">{formik.errors.techStack}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => formik.resetForm()}
            disabled={isSubmitting}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                <span>Adding...</span>
              </>
            ) : (
              'Add Extension'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExtension;