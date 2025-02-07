import React from 'react'

const Feedback = ({question, answer, isCorrect, feedback }) => {
  return (
    <div className='w-full text-center py-2 space-y-4 border-[5px]'>
      <p className='font-semibold text-md'><span className='font-extrabold'>Question: </span>{question}</p>
      <p className='font-semibold text-md'><span className='font-extrabold'>Answer: </span>{answer}</p>
      <p className='font-semibold text-md'><span className='font-extrabold'>Your Answer is: </span>{isCorrect? 'True': 'False' }</p>
      <p className='font-semibold text-md'><span className='font-extrabold'>feedback: </span>{feedback}</p>
    </div>
  )
}

export default Feedback
