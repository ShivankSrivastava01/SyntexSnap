import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-[80vh]'>
      <div className='space-y-8 w-full max-w-md'>
        <div>
          <h2 className="mt-6 font-extrabold text-3xl text-center text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Sign in to your account
          </p>
        </div>
        <form className="space-y-6 bg-white shadow-lg mt-8 p-8 rounded-xl">
          <div className="space-y-4 shadow-sm rounded-md">
            <div className="relative">
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700 text-sm">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your email"
                  // onChange={loginForm.handleChange}
                  // value={loginForm.values.email}
                />
              </div>
              {/* {loginForm.touched.email && loginForm.errors.email && (
                <p className="mt-1 text-red-500 text-sm">{loginForm.errors.email}</p>
              )} */}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={`appearance-none relative block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your password"
                  // onChange={loginForm.handleChange}
                  // value={loginForm.values.password}
                />
              </div>
              {/* {loginForm.touched.password && loginForm.errors.password && (
                <p className="mt-1 text-red-500 text-sm">{loginForm.errors.password}</p>
              )} */}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
                // onChange={loginForm.handleChange}
                // checked={loginForm.values.rememberMe}
              />
              <label htmlFor="rememberMe" className="block ml-2 text-gray-900 text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="relative flex justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2.5 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-sm text-white transition-all duration-200 focus:outline-none group"
          >
            Sign in
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login