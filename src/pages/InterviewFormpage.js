import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react"

const InterviewformPage = () => {
    
    const navigate = useNavigate();
    const { fetchquestion, setQuestion, setFormData, formData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    // const [formData, setFormData] = useState({ role: "Full Stack Web Development", description: "React,Node.js", years: "4" });

    function changeHandler(e) {

        setFormData((prevForm) => {
            return {
                ...prevForm,
                [e.target.name]:e.target.value
            }
        })
    }

    async function submitHandler(e) {
        e.preventDefault();
        //naviagate to the interviewPage

        let role = formData.role;
        let description = formData.description;
        let years = formData.years;
        try {
            setLoading(true);
            const res = await fetchquestion(role,description,years);
            setQuestion(res.questions);
            navigate('/interviewpage');
        }
        catch (error) {
            //
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className='w-full h- flex mb-20 mt-[10vh]'>
            <form onSubmit={submitHandler} action=""  className=' sm:w-2/5 w-4/5 h-fit mx-auto space-y-6 pb-12 flex flex-col rounded-md p-3 outline justify-between '>
                <p className='font-bold text-2xl text-center font-serif mb-4'>Tell US ABOUT YOUR JOB PROFILE</p>
                <div>
                <label htmlFor="role" className='font-semibold text-md '>Job Role</label>
                <input onChange={changeHandler} type="text" id='role' value={formData.role} name="role" className='border border-gray-700 rounded-md w-full p-2 ' />
                </div>

                <div>
                    <label htmlFor="description" className='font-semibold text-md'>Job Description</label>
                    <input onChange={changeHandler} type="text" id="description" value={formData.description} name="description" className='border border-gray-700 rounded-md w-full p-2' />
                </div>

                <div>
                    <label htmlFor="years" className='font-semibold text-md'>Years of Experience/Type NA if not</label>
                    <input onChange={changeHandler} type="text" id="years" name="years" value={formData.years} className='border border-gray-700 rounded-md w-full p-2' />
                </div>  
                 
                <button className='rounded-xl p-2 outline-gray-600 text-white bg-black w-fit mx-auto'>
                    {
                        loading ? (
                            <p className='flex'><span className='text-white'>Fetching </span><Loader2 className='text-white animate-spin'></Loader2></p>
                            
                            
                        ):("submit")
                    }
                </button>
               
            </form>
        </div>
    )
}

export default InterviewformPage
