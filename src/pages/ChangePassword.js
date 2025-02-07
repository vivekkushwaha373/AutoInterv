import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';


const ChangePassword = () => {
    const { changepassword} = useContext(AppContext);
    const [formData, setFormData] = useState({ oldpass: "", newpass: "", confirmpass: "" });
    

    function click(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]:e.target.value,
            }
        })
    }


    async function submit(e) {
        e.preventDefault();
       
        const oldpass = formData.oldpass;
        const newpass = formData.newpass;
        const confirmpass = formData.confirmpass;

        try {
            await changepassword(oldpass, newpass, confirmpass);
        }
        catch (error) {
            
        }
    }


  return (
      <div className='w-[100%] h-[100vh] flex flex-col  justify-center bg-gray-400'>
          <div className='mx-auto outline lg:w-2/5 md:w-3/5 w-[80%] py-10 rounded-lg bg-gray-300 '>
              <p className='text-center font-bold font-serif text-lg' >Change Password</p>
              <form onSubmit={submit} action="" className='flex flex-col gap-6 p-3'>
                  <input onChange={click} type="password" name='oldpass' placeholder='Old Password' id='email' value={formData.oldpass} className='p-2 rounded-lg outline' />
                  <input onChange={click} type="password" name='newpass' placeholder='New Password' id='email' value={formData.newpass} className='p-2 rounded-lg outline' />
                  <input onChange={click} type="password" name='confirmpass' placeholder='Confirm Password' id='email' value={formData.confirmpass} className='p-2 rounded-lg outline' />
                  <button className='w-fit bg-blue-400 mx-auto p-3 rounded-lg font-bold hover:bg-blue-600 ' >Reset Password</button>
              </form>
          </div>
      </div>
  )
}

export default ChangePassword
