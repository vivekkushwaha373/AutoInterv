import React, { useContext } from 'react'
import FetchInterview from '../components/FetchInterview'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';


const InterviewPage = () => {
    const { interviewgiven } = useContext(AppContext);
    const navigate = useNavigate();

    
    
    return (
      <div>
        {interviewgiven.length > 0 ?
          (
            interviewgiven.map(({ _id, jobrole, jobdescription, experience, feedback }, index) => {
              return <FetchInterview id={_id} role={jobrole} description={jobdescription} years={experience}
                feedback={feedback} key={index}></FetchInterview>
            })
          ):
          (
            <div className='flex flex-col gap-2'>
            <p className="text-center mt-[17%] text-3xl">No Interview given</p>
              <button onClick={() => { navigate('/interformpage')}} className=' w-fit mx-auto mt-2 border rounded-xl p-3 bg-blue-400'>Give Interview</button>
            </div>
          )
        }
            {/* {
            interviewgiven.map(({_id, jobrole, jobdescription, experience,feedback },index) => {
            return <FetchInterview id={_id} role={jobrole} description={jobdescription} years={experience}
                feedback={feedback} key={index}></FetchInterview>
            })
            }       */}
    </div>
  )
}

export default InterviewPage
