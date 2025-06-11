import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({ password1: '', password2: '' });
  const { resetPassword } = useContext(AppContext);

  function change(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await resetPassword(token, formData.password1, formData.password2);
    }
    catch (error) {

    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950'>
      <div className='mx-auto lg:w-2/5 md:w-3/5 w-[80%] max-w-md'>
        <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-2xl'>
          {/* Header Section */}
          <div className='text-center mb-8'>
            <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30'>
              <svg className='w-8 h-8 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
              </svg>
            </div>
            <h1 className='font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
              Reset Password
            </h1>
            <p className='text-slate-400 text-sm'>
              Create a new secure password for your account
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={submit} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='password1' className='block text-sm font-medium text-slate-300'>
                New Password
              </label>
              <input
                type="password"
                onChange={change}
                name='password1'
                placeholder='Enter new password'
                id='password1'
                className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='password2' className='block text-sm font-medium text-slate-300'>
                Confirm Password
              </label>
              <input
                type="password"
                onChange={change}
                name='password2'
                placeholder='Confirm new password'
                id='password2'
                className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50 flex items-center justify-center gap-2'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              Reset Password
            </button>
          </form>

          {/* Security Note */}
          <div className='mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg'>
            <div className='flex items-start gap-3'>
              <svg className='w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <div>
                <p className='text-blue-300 text-sm font-medium mb-1'>Security Tip</p>
                <p className='text-slate-400 text-xs'>
                  Choose a strong password with at least 8 characters, including letters, numbers, and symbols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword