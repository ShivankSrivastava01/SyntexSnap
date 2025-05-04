
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddExtension = () => {
  const formik = useFormik({
    initialValues: {
      extensionName: '',
      description: '',
      version: '',
    },
    validationSchema: Yup.object({
      extensionName: Yup.string()
        .required('Extension name is required')
        .min(3, 'Extension name must be at least 3 characters long'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long'),
      version: Yup.string()
        .required('Version is required')
        .matches(/^\d+\.\d+\.\d+$/, 'Version must follow semantic versioning (e.g., 1.0.0)'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/extension/add', values);
        toast.success(`Extension "${response.data.name}" added successfully!`);
        formik.resetForm();
      } catch (error) {
        toast.error('Failed to add extension. Please try again.');
      }
    },
  });

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Add Extension</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="extensionName" className="block text-sm font-medium text-gray-700">Extension Name</label>
          <input
            id="extensionName"
            name="extensionName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.extensionName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.extensionName && formik.errors.extensionName ? (
            <p className="text-red-500 text-sm">{formik.errors.extensionName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="version" className="block text-sm font-medium text-gray-700">Version</label>
          <input
            id="version"
            name="version"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.version}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.version && formik.errors.version ? (
            <p className="text-red-500 text-sm">{formik.errors.version}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Extension
        </button>
      </form>
    </div>
  );
};

export default AddExtension;