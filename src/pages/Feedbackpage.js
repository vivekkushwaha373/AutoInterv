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
  const {currfeedback} = useContext(AppContext);
  let feedbackdata = currfeedback;
  console.log(feedbackdata);
  return (
    <div className='w-11/12 mx-auto text-center'>
      <div className='w-full text-center '>
      <h1 className='font-bold text-2xl '>Job role:{formData.role}</h1>
      <h1 className='font-medium text-lg'>Job description:{formData.description}</h1>
      <h1 className='font-medium text-lg'>Years of Experiance :{formData.years}</h1>
      </div>


      <div className='w-full h-[500px] border-y-4 overflow-scroll'>
        {
          currfeedback.map(({ question, answer, isCorrect, feedback }, index) => {
                   return <Feedback key={index} question={question} answer={answer} isCorrect={isCorrect} feedback={feedback}></Feedback>
                       })
      }
      </div>
      <button onClick={redirect} className='mx-auto p-2 mt-1 rounded-lg hover:bg-blue-300 hover:font-bold transition-all border-2 border-gray-950 '>Give another Interview</button>

    </div>
  )
}

export default Feedbackpage
