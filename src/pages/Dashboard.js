import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { interviewgiven, user, userprofile, getMyInterview } = useContext(AppContext);
  // const { interviewgiven, user,userprofile} = useContext(AppContext);
  const [form, setFormdata] = useState({ firstname: user.firstname, lastname: user.lastname, email:user.email})
  
  function change(e) {

    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
    
  }
  async function getInterview() {
    try {
      const res = await getMyInterview();
    }
    catch (error) {
      
    }
  }
  
  async function updateprofile(e) {
    e.preventDefault();
    let firstname = form.firstname;
    let lastname = form.lastname;
    let email = form.email;
    try {
      //pending
      const res = await userprofile(firstname, lastname, email);
    }
    catch (error) {
      
    } 
  }
  return (
    // <div className='flex flex-wrap'>
      
    //   <div className='w-full'>
    //     <form onSubmit={updateprofile} action="">
    //       <input type="text" name='firstname' value={form.firstname} placeholder='firstname' />
    //       <input type="text" name='lastname' value={form.lastname} placeholder='lastname' />
    //       <input type="text" name='email' value={form.email} placeholder='email' />
    //       <button>Update Profile</button>
    //     </form>
    //     <Link to='/changepassword'>
    //       <button>Change Password</button>
    //     </Link>
          
      // </div>
      
      <div className='w-[100%] h-[100vh] flex flex-col justify-center bg-gray-400'>
        <div className='mx-auto text-center outline lg:w-2/5 md:w-3/5 w-[80%] py-10 rounded-lg bg-gray-300 '>
          <p className='text-center font-bold font-serif text-lg' >Update Profile</p>
          <form onSubmit={updateprofile} action="" className='flex flex-col gap-6 p-3'>
            <input onChange={change} type="text" name='firstname' placeholder='firstname'  value={form.firstname} className='p-2 rounded-lg outline' />
          <input onChange={change} type="text" name='lastname' placeholder='lastname'  value={form.lastname} className='p-2 rounded-lg outline' />
          <input onChange={change} type="text" name='email' placeholder='email' value={form.email} className='p-2 rounded-lg outline' />
            <button className='w-fit bg-blue-400 mx-auto p-3 rounded-lg font-bold hover:bg-blue-600 ' >Update Profile</button>
          </form>
          <Link to='/changepassword'>
            <button className='font-bold'>Change Password</button>
        </Link>
        <br />
        <Link to='/interviewdashboard'>
          <button onClick={getInterview} className='font-bold  bg-blue-400 mx-auto p-3 rounded-lg mt-2  hover:bg-blue-600'>My Interviews</button>
        </Link>
        </div>
      </div>

      //  <div className='w-full'>
      //   <p>{interviewgiven.length > 0 ? <p>Interviews you have Given</p> : <p>You haven't given any interview</p>}</p>
      //   {
      //     map.interviewgiven(({ jobrole, jobdescription, years }, index) => {
      //       return <FetchInterview jobrole={jobrole} jobdescription={jobdescription} years={years} key={index}></FetchInterview>
      //     })
      //   }
      // </div> 
     
    // </div>
   
  )
}

export default Dashboard
