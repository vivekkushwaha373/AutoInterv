import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ForgotPassword = () => {
    const [resetPassword, setResetPassword] = useState(false);
    const [email, setemail] = useState(null);
    const {forgetpassword} = useContext(AppContext);
    // const [password, setPassword] = useState(null);
    // const [confirmPassword, setConfirmPassword] = useState(null);

    async function submitemail(e) {
        e.preventDefault();
        try {
            await forgetpassword(email); 
            
        }
        catch (error) {
            
        }
       
    }

    // async function submitPassword(e) {
    //     e.preventDefault();
    //     //remaining code    
    // }



    return (
        <div className='w-[100%] h-[100vh] flex flex-col  justify-center bg-gray-400'>
           
                <div className='mx-auto outline lg:w-2/5 md:w-3/5 w-[80%] py-10 rounded-lg bg-gray-300 '>
                  <p className='text-center font-bold font-serif text-lg' >Enter Your Email</p>
                        <form onSubmit={submitemail} action="" className='flex flex-col gap-6 p-3'>
                        <input onChange={(e) => setemail(e.target.value)} type="email" placeholder='Email' id='email' className='p-2 rounded-lg outline' />
                        <button className='w-fit bg-blue-400 mx-auto p-3 rounded-lg font-bold hover:bg-blue-600 ' >submit</button>
                 </form>        
                </div> 
                   
            
        </div>
    );
};

export default ForgotPassword;
