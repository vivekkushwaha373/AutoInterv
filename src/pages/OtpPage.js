import React, { useContext, useState } from 'react'
import OtpInput from 'react-otp-input';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const {otpstatus,loading, error } = useContext(AppContext);
    const { otpsender} = useContext(AppContext);
    const navigate = useNavigate();

    async function Resend(e) {
        
        //step1
        e.preventDefault();
        
        //step2

        try {
            let signUpform = JSON.parse(localStorage.getItem('signUpformdata'));
            const email = signUpform.email;
            await otpsender(email);
            
        }
        catch (error) {
            
        }

    }
    async function submitHandler(e) {
        e.preventDefault();
        try {
            
            let signUpform = JSON.parse(localStorage.getItem('signUpformdata'));
            
            signUpform = {
                ...signUpform,
                otp
            }

            await otpstatus(signUpform);
            
        }
        catch (error) {
            
        }
    }
  return (
      <div className="w-full h-screen flex justify-center  items-center bg-slate-900">
          <div className='border-4 border-white rounded-3xl p-4 pb-20  shadow-zinc-50'>
              <form onSubmit={submitHandler} >
                  <p className='font-bold text-lg text-white text-center p-4 underline '>Enter Your OTP</p>
                  <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => (
                          <input
                              {...props}
                              placeholder="-"
                              style={{
                                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-[48px] lg:w-[60px] border-0 bg-slate-200 rounded-[0.5rem] text-black aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                          />
                      )}
                      containerStyle={{
                          justifyContent: "space-between",
                          gap: "0 6px",
                      }}
                  />
                  <button type="submit" className="w-full bg-yellow-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-gray-900">
                      {loading ? "Verifing..." : "verify"}
                  </button>
              </form>
              <button onClick={Resend} className="w-full bg-yellow-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-gray-900">Resend OTP</button>
        </div>
         
    </div>
  )
}

export default OtpPage
