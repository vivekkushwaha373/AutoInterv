import React, { useContext, useEffect } from 'react'
import FetchInterview from '../components/FetchInterview'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { fetchMyInterview } from '../APIHandler/apicommunicator';

const InterviewPage = () => {
  const { setinterviewgiven } = useContext(AppContext);
  const { interviewgiven } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(async () => { 
     const res = await fetchMyInterview();
      setinterviewgiven(res.data);
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950'>
      <div className='w-11/12 max-w-6xl mx-auto py-8'>
        {interviewgiven.length > 0 ?
          (
            <div className='space-y-6'>
              <h1 className='text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8'>
                Your Interview History
              </h1>
              {interviewgiven.map(({ _id, jobrole, jobdescription, experience, feedback }, index) => {
                return <FetchInterview id={_id} role={jobrole} description={jobdescription} years={experience}
                  feedback={feedback} key={index}></FetchInterview>
              })}
            </div>
          ) :
          (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
              <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 max-w-md'>
                <div className='mb-6'>
                  <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30'>
                    <svg className='w-12 h-12 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                    </svg>
                  </div>
                  <h2 className='text-2xl font-bold text-white mb-2'>No Interviews Yet</h2>
                  <p className='text-slate-400 text-lg'>Ready to start your interview journey?</p>
                </div>

                <button
                  onClick={() => { navigate('/interformpage') }}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50'
                >
                  Start Your First Interview
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default InterviewPage