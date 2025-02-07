import React, { useContext, useEffect, useRef, useState } from 'react'
import data from '../data'
import { AiOutlineSend } from "react-icons/ai";
import ChatBlocks from '../components/ChatBlocks';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatRoom = () => {
    let chats = data();
    const { setEntireMessage, Entiremessage, requestMessage, user, deletemessage } = useContext(AppContext);
    const [ formdata, setFormData ] = useState({ "message": "" });
    const bottomOfPanelRef = useRef(null);
    let firstname = user.firstname;
    let lastname = user.lastname;
    useEffect(() => {
        if (bottomOfPanelRef.current) {
            bottomOfPanelRef.current.scrollIntoView();
       } 
    },[Entiremessage])
 
    async function clearChat() {
        try {
            const res = await deletemessage(); 
        }
        catch (error) {
            
        }
    }

    function onChangeHandler(e) {
        
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }
    async function onSubmitHandler(e) {
        e.preventDefault();
        setEntireMessage((data) => {
            return [
                ...data,
                { role: 'user', content: formdata.message }
            ]
         
        })
        //remaing code
        
        try {
           const res=await requestMessage(formdata.message);
            setEntireMessage((data) => {
                return [
                    ...data,
                    { role: 'assistant', content: res.data }
                    
                ]

            }) 
        }
        catch (error) {
            //
        }

        
        formdata.message = '';

        
    }

    return (
        <div className="w-full px-8 pt-6 h-screen bg-slate-900 overflow-y-hidden ">
            <div className='w-full flex gap-3 h-[80%]'>
                {/* section1         */}
                <div className=' sm:w-[30%] w-[0px] hidden h-fit outline rounded-md sm:flex flex-col items-center text-start p-2 pb-16 gap-4 bg-slate-700'>
                    <img src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}`} alt="user-img" className=' rounded-full' />

                    <p className='text-white font-semibold font-serif'>You are talking to ChatBot</p>
                    <p className='mt-5 text-white font-semibold font-mono text-wrap text-center'>You can ask some questions
                        related to Knowledge. Business, Advices,
                        Education, etc. But avoid sharing personal
                        Information.
                    </p>
                    <button className=' mt-[40%] bg-orange-500 text-lg text-white p-2 font-serif font-bold rounded-xl' onClick={clearChat}>CLEAR CONVERSATION</button>
                </div>
                {/* section2 */}
                <div className='w-full h-full'>

                    <div className='w-full h-full overflow-y-scroll overscroll-behavior-y: revert'>
                        <p className="text-4xl font-semibold text-center font-serif mb-6 text-white">Model-GPT 3.5 Turbo</p>
                        <div className='flex flex-col gap-2  max-h-full'>
                            {
                                Entiremessage.map(({ role, content }, index) => {
                                    return <ChatBlocks key={index} role={role} content={content}></ChatBlocks>
                                })
                            }
                            <div ref={bottomOfPanelRef}></div>
                        </div>
                    </div >

                    <form onSubmit={onSubmitHandler} className='w-full flex '>
                        <input type="text" name="message" value={formdata.message} onChange={onChangeHandler} className="w-full p-4 rounded-l-lg " />
                        <button className='text-lg p-4 bg-white rounded-r-lg' ><AiOutlineSend /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom
