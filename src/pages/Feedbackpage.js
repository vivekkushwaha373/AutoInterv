import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import data from '../data';
import Feedback from '../components/Feedback';
import { useNavigate } from 'react-router-dom';

const Feedbackpage = () => {

  const navigate = useNavigate();
  function redirect() {
    navigate('/interformpage');
  }

  const { formData } = useContext(AppContext);

  const { currfeedback } = useContext(AppContext);
  let feedbackdata = currfeedback;
  console.log(feedbackdata);
  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white'>
      <div className='w-11/12 max-w-6xl mx-auto py-8'>
        {/* Header Section */}
        <div className='text-center mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50'>
          <h1 className='font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3'>
            Job Role: {formData.role}
          </h1>
          <h2 className='font-medium text-lg text-slate-300 mb-2'>
            Job Description: {formData.description}
          </h2>
          <h3 className='font-medium text-lg text-slate-300'>
            Years of Experience: {formData.years}
          </h3>
        </div>

        {/* Feedback Section */}
        <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 mb-6'>
          <div className=' p-4 feeddiv'>
            {
              currfeedback.map(({ question, answer, isCorrect, feedback }, index) => {
                return <Feedback key={index} question={question} answer={answer} isCorrect={isCorrect} feedback={feedback}></Feedback>
              })
            }
          </div>
        </div>

        {/* Action Button */}
        <div className='text-center'>
          <button
            onClick={redirect}
            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50'
          >
            Give Another Interview
          </button>
        </div>
      </div>
    </div>
  )
}

export default Feedbackpage