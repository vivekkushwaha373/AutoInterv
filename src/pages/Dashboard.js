import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user, userprofile, getMyInterview } = useContext(AppContext)

  const [form, setFormdata] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  })

  const [isLoading, setIsLoading] = useState(false)

  function change(e) {
    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  async function getInterview() {
    try {
      const res = await getMyInterview()
    }
    catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  async function updateprofile(e) {
    e.preventDefault()
    setIsLoading(true)

    let firstname = form.firstname
    let lastname = form.lastname
    let email = form.email

    try {
      const res = await userprofile(firstname, lastname, email)
    }
    catch (error) {
      console.error('Error updating profile:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2'>
            Dashboard
          </h1>
          <p className='text-slate-400 text-lg'>
            Manage your profile and track your progress
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className='bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden'>
          {/* Profile Update Section */}
          <div className='p-8 border-b border-slate-700/50'>
            <div className='flex items-center mb-6'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-white'>Update Profile</h2>
            </div>

            <form onSubmit={updateprofile} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-300'>First Name</label>
                  <input
                    onChange={change}
                    type='text'
                    name='firstname'
                    placeholder='Enter your first name'
                    value={form.firstname}
                    className='w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-slate-300'>Last Name</label>
                  <input
                    onChange={change}
                    type='text'
                    name='lastname'
                    placeholder='Enter your last name'
                    value={form.lastname}
                    className='w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-300'>Email Address</label>
                <input
                  onChange={change}
                  type='email'
                  name='email'
                  placeholder='Enter your email address'
                  value={form.email}
                  className='w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200'
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {isLoading ? (
                  <>
                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </button>
            </form>
          </div>

          {/* Action Buttons Section */}
          <div className='p-8 space-y-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <Link to='/changepassword' className='block'>
                <button className='w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50 flex items-center justify-center group'>
                  <svg className='w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2L2.257 8.257a6 6 0 0110.486-2.514zM7 17v4a1 1 0 001 1h4v-4' />
                  </svg>
                  Change Password
                </button>
              </Link>

              <Link to='/interviewdashboard' className='block'>
                <button
                  onClick={getInterview}
                  className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] flex items-center justify-center group'
                >
                  <svg className='w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  My Interviews
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className='mt-8 grid md:grid-cols-3 gap-4'>
          <div className='bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 text-center'>
            <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <h3 className='text-white font-semibold mb-1'>Profile</h3>
            <p className='text-slate-400 text-sm'>Complete & Updated</p>
          </div>

          <div className='bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 text-center'>
            <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
              </svg>
            </div>
            <h3 className='text-white font-semibold mb-1'>Interviews</h3>
            <p className='text-slate-400 text-sm'>Track Progress</p>
          </div>

          <div className='bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 text-center'>
            <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='text-white font-semibold mb-1'>Security</h3>
            <p className='text-slate-400 text-sm'>Password Protected</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard