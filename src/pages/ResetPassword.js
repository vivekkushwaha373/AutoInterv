import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({password1:'', password2:''});
  const {resetPassword} = useContext(AppContext);
  function change(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
        
    })
    
  }
  
  async function submit(e)
  {
    e.preventDefault();
    try {
      await resetPassword(token,formData.password1,formData.password2);
    }
    catch (error) {
      
    }
  }


  return (
      <div className='w-[100%] h-[100vh] flex flex-col  justify-center bg-gray-400'>
          <div className='mx-auto outline lg:w-2/5 md:w-3/5 w-[80%] py-10 rounded-lg bg-gray-300 '>
              <p className='text-center font-bold font-serif text-lg' >Reset Password</p>
              <form action="" onSubmit={submit} className='flex flex-col gap-6 p-3'>
                  <input type="password" onChange={change} name='password1' placeholder='Enter Password' id='email' className='p-2 rounded-lg outline' />
                  <input type="password" onChange={change} name='password2' placeholder='Confirm Password' id='email' className='p-2 rounded-lg outline' />
                  <button className='w-fit bg-blue-400 mx-auto p-3 rounded-lg font-bold hover:bg-blue-600 ' >Reset Password</button>
              </form>
          </div> 
    </div>
  )
}

export default ResetPassword
