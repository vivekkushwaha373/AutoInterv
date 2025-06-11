import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ForgotPassword = () => {
    const [resetPassword, setResetPassword] = useState(false);
    const [email, setemail] = useState(null);
    const { forgetpassword } = useContext(AppContext);

    async function submitemail(e) {
        e.preventDefault();
        try {
            await forgetpassword(email);

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
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </svg>
                        </div>
                        <h1 className='font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
                            Reset Password
                        </h1>
                        <p className='text-slate-400 text-sm'>
                            Enter your email address to receive a password reset link
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={submitemail} className='space-y-6'>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='block text-sm font-medium text-slate-300'>
                                Email Address
                            </label>
                            <input
                                onChange={(e) => setemail(e.target.value)}
                                type="email"
                                placeholder='Enter your email'
                                id='email'
                                className='w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50'
                        >
                            Send Reset Link
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='text-center mt-6 pt-6 border-t border-slate-700/50'>
                        <p className='text-slate-400 text-sm'>
                            Remember your password?
                            <span className='text-blue-400 hover:text-blue-300 cursor-pointer ml-1 font-medium'>
                                Sign in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;