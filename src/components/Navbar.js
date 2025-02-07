import React, { useContext, useRef, useState } from 'react'
import logo from '../Assets/intervai.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './Nav.css'


const Navbar = () => {
  let menu = useRef();
  let mobile = useRef(); 
  const location = useLocation();
 
  const { isLoggedIn, LogOut } = useContext(AppContext);
  const navigate = useNavigate();
  function logmein() {
    navigate('/login')
  }

  function interviewme() {
    navigate('/interformpage');
  }

  function signmeup() {
    navigate('/signup');
  }

  async function logmeout() {
    try {
      await LogOut();
      navigate('/')
    }
    catch (error) {

    }
  }

  function myprofile() {
    navigate('/dashboard');
  }

  function home() {
    navigate('/');
  }

  function chatmein() {
    navigate('/chatroom');
  }

  return (
    <div className='w-[100%] p-4 flex justify-between flex-wrap bg-gray-950'>
      <div className='flex justify-center align-center contain-content gap-2'>
        <img src={logo} alt="" className='GPTLogo size-9' />
        <p className='font-bold text-xl font-serif text-white'>AUTO<span className='text-sm '>Interv</span></p>

      </div>
     
      <div className="flex items-center justify-center gap-[8px] flex-col sm:hidden" ref={menu} onClick={() => {
        mobile.current.classList.toggle('activemobile');
        menu.current.classList.toggle('activeham')
      }}>
        <div className="ham ham1"></div>
        <div className="ham ham2"></div>
        <div className="ham ham3"></div>
      </div>

      <div  className=' flex-row space-x-2 w-fit hidden sm:block'>

        {location.pathname != '/' && <button onClick={home} className='md:text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-2'>Home</button>}
        {!isLoggedIn && <button onClick={logmein} className='md:text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-2'>Login</button>}

        {isLoggedIn && <button onClick={chatmein} className='md:text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-2'>Chatroom</button>}
        {isLoggedIn && <button onClick={interviewme} className='md:text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-2'>AI Interview</button>}
        {isLoggedIn && <button onClick={logmeout} className='md:text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-2'>Logout</button>}
        {isLoggedIn && <button onClick={myprofile} className='md:text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-2'>Dashboard</button>}

        <button onClick={signmeup} className='md:text-lg font-bold font-serif py-2 bg-purple-400 border rounded-lg px-2'>SignUp</button>

      </div>

      {/* <div  className=' flex-row space-x-4 w-fit hidden sm:block'>

        {location.pathname != '/' && <button onClick={home} className='text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-4'>Home</button>}
        {!isLoggedIn && <button onClick={logmein} className='text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-4'>Login</button>}

        {isLoggedIn && <button onClick={chatmein} className='text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-4'>Chatroom</button>}
        {isLoggedIn && <button onClick={interviewme} className='text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-4'>AI Interview</button>}
        {isLoggedIn && <button onClick={logmeout} className='text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-4'>Logout</button>}
        {isLoggedIn && <button onClick={myprofile} className='text-lg font-bold font-serif py-2 bg-blue-500 border rounded-lg px-4'>Dashboard</button>}

        <button onClick={signmeup} className='text-lg font-bold font-serif py-2 bg-purple-400 border rounded-lg px-4'>SignUp</button>

      </div> */}
    
     
      <ul ref={mobile} className='fixed transition-all top-[80px] w-full h-fit p-3  bg-[rgb(17,20,23,0.476)] backdrop-blur-[7px]  right-0 translate-x-full  flex flex-col'>

        {location.pathname != '/' && <li onClick={home} className='text-lg font-bold font-serif text-white py-1 px-4'>Home</li>}
        {!isLoggedIn && <li onClick={logmein} className='text-lg font-bold font-serif text-white py-1  px-4'>Login</li>}
        {isLoggedIn && <li onClick={chatmein} className='text-lg font-bold font-serif text-white px-4 py-1'>Chatroom</li>}
        {isLoggedIn && <li onClick={interviewme} className='text-lg font-bold font-serif text-white px-4 py-1'>AI Interview</li>}
        {isLoggedIn && <li onClick={logmeout} className='text-lg font-bold font-serif  text-white px-4 py-1'>Logout</li>}
        {isLoggedIn && <li onClick={myprofile} className='text-lg font-bold font-serif  text-white px-4 py-1'>Dashboard</li>}
         <li onClick={signmeup} className='text-lg font-bold font-serif text-white px-4'>SignUp</li>
      </ul>
     
    </div>
  )
}

export default Navbar
