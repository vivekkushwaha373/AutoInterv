import React from 'react'

const Feedback = ({ question, answer, isCorrect, feedback }) => {
  return (
    <div className='w-full mb-6 p-6 bg-slate-700/40 backdrop-blur-sm rounded-lg border border-slate-600/50 hover:bg-slate-700/60 transition-all duration-200'>
      <div className='space-y-4 text-left'>
        <p className='font-medium text-slate-200'>
          <span className='font-bold text-blue-400'>Question: </span>
          <span className='text-white'>{question}</span>
        </p>

        <p className='font-medium text-slate-200'>
          <span className='font-bold text-purple-400'>Answer: </span>
          <span className='text-white'>{answer}</span>
        </p>

        <p className='font-medium text-slate-200'>
          <span className='font-bold text-yellow-400'>Your Answer is: </span>
          <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct' : 'Incorrect'}
          </span>
        </p>

        <div className='bg-slate-800/50 rounded-md p-4 border-l-4 border-indigo-500'>
          <p className='font-medium text-slate-200'>
            <span className='font-bold text-indigo-400'>Feedback: </span>
            <span className='text-slate-100'>{feedback}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Feedback