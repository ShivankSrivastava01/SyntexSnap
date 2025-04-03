import Link from 'next/link'
import React from 'react'

const Signup = () => {
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

        <form className="space-y-6 bg-white shadow-lg mt-8 p-8 rounded-xl">
          <div className="space-y-4 rounded-md">
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Name</label>
              <input
                type="text"
                name="name"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                // onChange={signupForm.handleChange}
                // value={signupForm.values.name}
                placeholder="Enter your name"
              />
              {/* {signupForm.touched.name && signupForm.errors.name && (
                <p className="mt-1 text-red-500 text-sm">{signupForm.errors.name}</p>
              )} */}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Email</label>
              <input
                type="email"
                name="email"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                // onChange={signupForm.handleChange}
                // value={signupForm.values.email}
                placeholder="Enter your email"
              />
              {/* {signupForm.touched.email && signupForm.errors.email && (
                <p className="mt-1 text-red-500 text-sm">{signupForm.errors.email}</p>
              )} */}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Password</label>
              <input
                type="password"
                name="password"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                // onChange={signupForm.handleChange}
                // value={signupForm.values.password}
                placeholder="Create a password"
              />
              {/* {signupForm.touched.password && signupForm.errors.password && (
                <p className="mt-1 text-red-500 text-sm">{signupForm.errors.password}</p>
              )} */}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                // onChange={signupForm.handleChange}
                // value={signupForm.values.confirmPassword}
                placeholder="Confirm your password"
              />
              {/* {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">{signupForm.errors.confirmPassword}</p>
              )} */}
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

export default Signup