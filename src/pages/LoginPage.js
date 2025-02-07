import React, { useContext, useState } from 'react'
import Aibot from '../Assets/airobot.png'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
 
  const [formData, setFormData] = useState({ email: "" , password: "" });
  const { login, loading, error } = useContext(AppContext);
  const navigate = useNavigate();
  
  function setpassword() {
    navigate('/forgotpassword');
  }

  function changeHandler(event) {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value
      }
    })  
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const email = formData.email;
      const password = formData.password;
      await login(email, password);
      
    }
    catch (error) {
      //here is your error
    }
    

  }  

  return (
    <div className='w-full min-h-full mx-auto  md:flex justify-between bg-black sm:px-20 px-5'>
      <div className='sm:w-[60%] md:w-full xl:w-[40%]'>
         <img src={Aibot} alt="Ai Robot" className='w-full'/>
      </div>
      
      <div className='flex flex-col justify-center w-full xl:w-[40%]'>
        <form onSubmit={submitHandler} className='w-full p-2 flex flex-col gap-5 '>
          <p className="font-bold text-[30px] font-serif text-center text-white">Login</p>
        
        
          <input className='appearance-none rounded-md w-full p-3  text-black placeholder-slate-900' type="email" name="email" value={formData.email} id="email" required="true" placeholder='Email' onChange={changeHandler} />
        
        
          <input className='appearance-none rounded-md w-full p-3  text-black placeholder-slate-900' type="password" name="password" value={formData.password} id="password" required="true" placeholder='Password' onChange={changeHandler} />
          
          <button className=' bg-blue-500 rounded-md w-full text-lg p-3'>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
          
          <button onClick={setpassword} className=' rounded-md w-fit mx-auto text-white text-lg p-3'>forget password</button>
      </div>
     
    </div>
  )
}

export default LoginPage
