import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const ChangePassword = () => {
    const { changepassword } = useContext(AppContext)
    const [formData, setFormData] = useState({
        oldpass: "",
        newpass: "",
        confirmpass: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showPasswords, setShowPasswords] = useState({
        oldpass: false,
        newpass: false,
        confirmpass: false
    })
    const [errors, setErrors] = useState({})

    function click(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors(prev => ({
                ...prev,
                [e.target.name]: ''
            }))
        }
    }

    function togglePasswordVisibility(field) {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    function validateForm() {
        const newErrors = {}

        if (!formData.oldpass) {
            newErrors.oldpass = 'Current password is required'
        }

        if (!formData.newpass) {
            newErrors.newpass = 'New password is required'
        } else if (formData.newpass.length < 6) {
            newErrors.newpass = 'Password must be at least 6 characters'
        }

        if (!formData.confirmpass) {
            newErrors.confirmpass = 'Please confirm your password'
        } else if (formData.newpass !== formData.confirmpass) {
            newErrors.confirmpass = 'Passwords do not match'
        }

        return newErrors
    }

    async function submit(e) {
        e.preventDefault()

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        const oldpass = formData.oldpass
        const newpass = formData.newpass
        const confirmpass = formData.confirmpass

        try {
            await changepassword(oldpass, newpass, confirmpass)
            // Reset form on success
            setFormData({ oldpass: "", newpass: "", confirmpass: "" })
        }
        catch (error) {
            setErrors({ general: 'Failed to change password. Please try again.' })
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2L2.257 8.257a6 6 0 0110.486-2.514zM7 17v4a1 1 0 001 1h4v-4' />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2'>
                        Change Password
                    </h1>
                    <p className='text-slate-400'>
                        Update your password to keep your account secure
                    </p>
                </div>

                {/* Main Form Card */}
                <div className='bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 p-8'>
                    {errors.general && (
                        <div className='mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm'>
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={submit} className='space-y-6'>
                        {/* Current Password */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-300'>Current Password</label>
                            <div className='relative'>
                                <input
                                    onChange={click}
                                    type={showPasswords.oldpass ? 'text' : 'password'}
                                    name='oldpass'
                                    placeholder='Enter your current password'
                                    value={formData.oldpass}
                                    className={`w-full p-4 pr-12 rounded-xl bg-slate-700/50 border ${errors.oldpass ? 'border-red-500/50' : 'border-slate-600/50'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200`}
                                />
                                <button
                                    type='button'
                                    onClick={() => togglePasswordVisibility('oldpass')}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200'
                                >
                                    {showPasswords.oldpass ? (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                                        </svg>
                                    ) : (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.oldpass && <p className='text-red-400 text-sm'>{errors.oldpass}</p>}
                        </div>

                        {/* New Password */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-300'>New Password</label>
                            <div className='relative'>
                                <input
                                    onChange={click}
                                    type={showPasswords.newpass ? 'text' : 'password'}
                                    name='newpass'
                                    placeholder='Enter your new password'
                                    value={formData.newpass}
                                    className={`w-full p-4 pr-12 rounded-xl bg-slate-700/50 border ${errors.newpass ? 'border-red-500/50' : 'border-slate-600/50'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200`}
                                />
                                <button
                                    type='button'
                                    onClick={() => togglePasswordVisibility('newpass')}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200'
                                >
                                    {showPasswords.newpass ? (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                                        </svg>
                                    ) : (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.newpass && <p className='text-red-400 text-sm'>{errors.newpass}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-slate-300'>Confirm New Password</label>
                            <div className='relative'>
                                <input
                                    onChange={click}
                                    type={showPasswords.confirmpass ? 'text' : 'password'}
                                    name='confirmpass'
                                    placeholder='Confirm your new password'
                                    value={formData.confirmpass}
                                    className={`w-full p-4 pr-12 rounded-xl bg-slate-700/50 border ${errors.confirmpass ? 'border-red-500/50' : 'border-slate-600/50'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200`}
                                />
                                <button
                                    type='button'
                                    onClick={() => togglePasswordVisibility('confirmpass')}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200'
                                >
                                    {showPasswords.confirmpass ? (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                                        </svg>
                                    ) : (
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmpass && <p className='text-red-400 text-sm'>{errors.confirmpass}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                        >
                            {isLoading ? (
                                <>
                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                    Updating Password...
                                </>
                            ) : (
                                <>
                                    <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                    Change Password
                                </>
                            )}
                        </button>
                    </form>

                    {/* Back to Dashboard Link */}
                    <div className='mt-6 text-center'>
                        <Link
                            to='/dashboard'
                            className='text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center justify-center group'
                        >
                            <svg className='w-4 h-4 mr-2 group-hover:translate-x-[-2px] transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                {/* Security Tips */}
                <div className='mt-6 bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/50'>
                    <h3 className='text-white font-semibold mb-2 flex items-center'>
                        <svg className='w-5 h-5 mr-2 text-yellow-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                        </svg>
                        Security Tips
                    </h3>
                    <ul className='text-slate-400 text-sm space-y-1'>
                        <li>• Use at least 8 characters with mixed case letters</li>
                        <li>• Include numbers and special characters</li>
                        <li>• Avoid using personal information</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword