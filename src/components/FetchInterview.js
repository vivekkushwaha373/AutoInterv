import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';


const FetchInterview = ({ id, role, description, years, feedback }) => {
  
  const navigate = useNavigate(); 
  const { setcurrFeedback, deletefeedback } = useContext(AppContext);
  const {setFormData} = useContext(AppContext);

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
    <div className='flex flex-col gap-3 p-4 '>
          <p className='p-2 font-bold text-md font-serif'>Job role:{role}</p>
          <p className='p-2 font-bold text-md font-serif'>Job Description:{description}</p>
      <p className='p-2 font-bold text-md font-serif'>Years of Experiance:{years}</p>
      {/* <Link to='/feedback'> */}
      <button onClick={onClickHandler}>Feedback</button>
      <button onClick={onClickDelete}>Delete</button>
      {/* </Link> */}
    </div>

  )
}

export default FetchInterview
