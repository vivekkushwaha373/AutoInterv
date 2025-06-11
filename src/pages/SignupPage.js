import React, { useContext, useState } from 'react'
import Aibot from '../Assets/airobot.png'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const SignupPage = () => {

  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const { otpsender, error, loading } = useContext(AppContext);

  function changeHandler(event) {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value
      }
    })
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const email = formData.email;
      localStorage.setItem('signUpformdata', JSON.stringify(formData));
      await otpsender(email);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 md:flex justify-between items-center sm:px-20 px-5'>
      {/* AI Robot Image Section */}
      <div className='sm:w-[60%] md:w-full xl:w-[40%] flex items-center justify-center p-8'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl'></div>
          <img src={Aibot} alt="AI Robot" className='relative z-10 w-full max-w-md mx-auto drop-shadow-2xl' />
        </div>
      </div>

      {/* Signup Form Section */}
      <div className='flex flex-col justify-center w-full xl:w-[40%] p-8'>
        <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-2xl max-w-md mx-auto w-full'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
              Create Account
            </h1>
            <p className='text-slate-400 text-sm'>
              Join us to start your interview journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label htmlFor="firstname" className='block text-sm font-medium text-slate-300'>
                  First Name
                </label>
                <input
                  className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  id="firstname"
                  required
                  placeholder='First Name'
                  onChange={changeHandler}
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor="lastname" className='block text-sm font-medium text-slate-300'>
                  Last Name
                </label>
                <input
                  className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  id="lastname"
                  required
                  placeholder='Last Name'
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor="email" className='block text-sm font-medium text-slate-300'>
                Email Address
              </label>
              <input
                className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                type="email"
                name="email"
                value={formData.email}
                id="email"
                required
                placeholder='Enter your email'
                onChange={changeHandler}
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor="password" className='block text-sm font-medium text-slate-300'>
                Password
              </label>
              <input
                className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                type="password"
                name="password"
                value={formData.password}
                id="password"
                required
                placeholder='Enter your password'
                onChange={changeHandler}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50 disabled:border-slate-500/50 flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <svg className='animate-spin w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                  </svg>
                  Signing up...
                </>
              ) : (
                <>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                  </svg>
                  Sign Up
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage