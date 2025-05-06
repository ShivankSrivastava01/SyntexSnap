'use client';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required')
    .matches(/[a-z]/, 'lowercase letter is required')
    .matches(/[A-Z]/, 'uppercase letter is required')
    .matches(/[0-9]/, 'number is required')
    .matches(/\W/, 'special character is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string().required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {

  const router = useRouter();

  // initializing formik
  const signForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/add`,
          values
        );

        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        toast.success('User Registered Successfully!');

        router.push('/login');
        resetForm();

      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
        setSubmitting(false);
      }

      // send values to backend
    },
    validationSchema: SignupSchema
  });

  return (
    <div className='flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-[80vh]'>
      <div className='space-y-8 w-full max-w-md'>
        <div>
          <h2 className="mt-6 font-extrabold text-3xl text-center text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Start your journey with us today
          </p>
        </div>

        <form onSubmit={signForm.handleSubmit} className="space-y-6 bg-white shadow-lg mt-8 p-8 rounded-xl">
          <div className="space-y-4 rounded-md">
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Name</label>
              <input
                type="text"
                name="name"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                onChange={signForm.handleChange}
                value={signForm.values.name}
                placeholder="Enter your name"
              />
              {signForm.touched.name && signForm.errors.name && (
                <p className="mt-1 text-red-500 text-sm">{signForm.errors.name}</p>
              )}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Email</label>
              <input
                type="email"
                name="email"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                onChange={signForm.handleChange}
                value={signForm.values.email}
                placeholder="Enter your email"
              />
              {signForm.touched.email && signForm.errors.email && (
                <p className="mt-1 text-red-500 text-sm">{signForm.errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Password</label>
              <input
                type="password"
                name="password"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                onChange={signForm.handleChange}
                value={signForm.values.password}
                placeholder="Create a password"
              />
              {signForm.touched.password && signForm.errors.password && (
                <p className="mt-1 text-red-500 text-sm">{signForm.errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                onChange={signForm.handleChange}
                value={signForm.values.confirmPassword}
                placeholder="Confirm your password"
              />
              {signForm.touched.confirmPassword && signForm.errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">{signForm.errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="relative flex justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2.5 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-sm text-white transition-all duration-200 focus:outline-none group"
          >
            Create Account
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;