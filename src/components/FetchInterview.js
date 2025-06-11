import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const FetchInterview = ({ id, role, description, years, feedback }) => {

  const navigate = useNavigate();

  const { setcurrFeedback, deletefeedback } = useContext(AppContext);
  const { setFormData } = useContext(AppContext);

  function onClickHandler() {
    setFormData(
      {
        role,
        description,
        years
      }
    )

    setcurrFeedback(feedback);
    navigate('/feedbackpage');
  }

  async function onClickDelete() {
    try {
      const res = await deletefeedback(id);
    }
    catch (error) {

    }
  }

  return (
    <div className='bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200 shadow-lg hover:shadow-xl'>
      <div className='space-y-4 mb-6'>
        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0'></div>
          <div>
            <span className='font-bold text-blue-400 text-sm uppercase tracking-wide'>Job Role</span>
            <p className='font-semibold text-white text-lg'>{role}</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0'></div>
          <div>
            <span className='font-bold text-purple-400 text-sm uppercase tracking-wide'>Job Description</span>
            <p className='font-medium text-slate-200 text-base'>{description}</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0'></div>
          <div>
            <span className='font-bold text-yellow-400 text-sm uppercase tracking-wide'>Years of Experience</span>
            <p className='font-semibold text-white text-lg'>{years}</p>
          </div>
        </div>
      </div>

      <div className='flex gap-3 pt-4 border-t border-slate-600/50'>
        <button
          onClick={onClickHandler}
          className='flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
          </svg>
          View Feedback
        </button>

        <button
          onClick={onClickDelete}
          className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default FetchInterview