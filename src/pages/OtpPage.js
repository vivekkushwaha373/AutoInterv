import React, { useContext, useState } from 'react'
import OtpInput from 'react-otp-input';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {

    const [otp, setOtp] = useState('');
    const { otpstatus, loading, error } = useContext(AppContext);
    const { otpsender } = useContext(AppContext);
    const navigate = useNavigate();

    async function Resend(e) {
        e.preventDefault();
        try {
            let signUpform = JSON.parse(localStorage.getItem('signUpformdata'));
            const email = signUpform.email;
            await otpsender(email);
        }
        catch (error) {
        }
    }

    async function submitHandler(e) {
        e.preventDefault();
        try {
            let signUpform = JSON.parse(localStorage.getItem('signUpformdata'));
            signUpform = {
                ...signUpform,
                otp
            }
            await otpstatus(signUpform);
        }
        catch (error) {
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex justify-center items-center px-5">
            <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-2xl max-w-md w-full'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='mx-auto w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4'>
                        <svg className='w-8 h-8 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                        </svg>
                    </div>
                    <h1 className='font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
                        Verify Your Email
                    </h1>
                    <p className='text-slate-400 text-sm'>
                        We've sent a 6-digit code to your email address
                    </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={submitHandler} className='space-y-6'>
                    <div className='space-y-4'>
                        <label className='block text-sm font-medium text-slate-300 text-center'>
                            Enter Verification Code
                        </label>
                        <div className='flex justify-center'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        placeholder="-"
                                        className="w-12 h-12 mx-1 text-center text-xl font-semibold bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "center",
                                    gap: "8px",
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50 disabled:border-slate-500/50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className='animate-spin w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            <>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                Verify Code
                            </>
                        )}
                    </button>
                </form>

                {/* Resend Section */}
                <div className='text-center mt-6 pt-6 border-t border-slate-700/50'>
                    <p className='text-slate-400 text-sm mb-3'>
                        Didn't receive the code?
                    </p>
                    <button
                        onClick={Resend}
                        className='text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto hover:bg-slate-700/30 px-4 py-2 rounded-lg'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                        </svg>
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OtpPage