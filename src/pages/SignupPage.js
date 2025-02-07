import React, { useContext, useState } from 'react'
import Aibot from '../Assets/airobot.png'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const SignupPage = () => {

  const [formData, setFormData] = useState({ firstname: "",lastname:"",email: "", password: "" });
  const { otpsender, error, loading } = useContext(AppContext);
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
      localStorage.setItem('signUpformdata', JSON.stringify(formData));
      
      
      await otpsender(email);
      
      
      // if (error) {
      //   toast.error(error);
      // }
      // else
      // {
      //   toast.success('OTP sent to your mail');
      // }
        
    }
    catch (error) {
      console.error(error);
    }
  }  
  return (
    <div className='w-full h-full mx-auto sm:flex justify-between bg-black sm:px-20 px-5'>
      <div className='sm:w-[60%] md:w-full xl:w-[40%]'>
        <img src={Aibot} alt="Ai Robot" className='w-full' />
      </div>

      <div className='flex items-center w-full xl:w-[40%]'>
        <form onSubmit={submitHandler} className='w-full p-2 flex flex-col gap-5 '>
          <p className="font-bold text-[30px] font-serif text-center text-white">Signup</p>

          <input className='appearance-none rounded-md w-full p-3  text-black placeholder-slate-900' type="text" name="firstname" value={formData.firstname} id="email" required="true" placeholder='first Name' onChange={changeHandler} />
          <input className='appearance-none rounded-md w-full p-3  text-black placeholder-slate-900' type="text" name="lastname" value={formData.lastname} id="email" required="true" placeholder='last Name' onChange={changeHandler} />
          
          <input className='appearance-none rounded-md w-full p-3  text-black placeholder-slate-900' type="email" name="email" value={formData.email} id="email" required="true" placeholder='Email' onChange={changeHandler} />


          <input className='appearance-none rounded-md w-full p-3  text-black placeholder-slate-900'  type="password" name="password" value={formData.password} id="password" required="true" placeholder='Password' onChange={changeHandler} />

          <button className=' bg-blue-500 rounded-md w-full text-lg p-3'>{loading?<p>Signing up...</p>:<p>SignUp</p>}</button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
