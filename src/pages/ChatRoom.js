import React, { useContext, useEffect, useRef, useState } from 'react'
import data from '../data'
import { AiOutlineSend } from "react-icons/ai";
import ChatBlocks from '../components/ChatBlocks';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { MessageCircle, Trash2, Bot, User, Sparkles } from 'lucide-react';

const ChatRoom = () => {
    let chats = data();
    const { setEntireMessage, Entiremessage, requestMessage, user, deletemessage } = useContext(AppContext);
    const [formdata, setFormData] = useState({ "message": "" });
    const bottomOfPanelRef = useRef(null);
    let firstname = user.firstname;
    let lastname = user.lastname;

    useEffect(() => {
        if (bottomOfPanelRef.current) {
            bottomOfPanelRef.current.scrollIntoView();
        }
    }, [Entiremessage])

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
        //remaining code

        try {
            const res = await requestMessage(formdata.message);
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
        <div className="h-[91%] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

            
            {/* Subtle gradient orbs */ }
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10 w-full px-4 sm:px-8 pt-6 h-full">
                <div className='w-full flex gap-6 h-full pb-6'>
                    {/* Sidebar */}
                    <div className='hidden sm:flex sm:w-80 w-0 h-full'>
                        <div className='w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl h-fit'>
                            {/* User Profile Section */}
                            <div className='flex flex-col items-center mb-6'>
                                <div className='relative mb-4'>
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=4F46E5&color=ffffff&size=80`} 
                                        alt="user-img" 
                                        className='rounded-full border-2 border-blue-500/50 shadow-lg' 
                                    />
                                    <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-slate-800 rounded-full'></div>
                                </div>
                                <h3 className='text-white font-semibold text-lg'>{firstname} {lastname}</h3>
                                <div className='flex items-center gap-2 mt-2 px-3 py-1 bg-blue-500/20 rounded-full'>
                                    <Bot className='w-4 h-4 text-blue-400' />
                                    <span className='text-blue-300 text-sm font-medium'>Chatting with AI</span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className='bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-600/30'>
                                <div className='flex items-center gap-2 mb-3'>
                                    <MessageCircle className='w-5 h-5 text-purple-400' />
                                    <span className='text-purple-300 font-semibold'>Chat Guidelines</span>
                                </div>
                                <p className='text-slate-300 text-sm leading-relaxed'>
                                    Ask questions about knowledge, business, advice, and education. Please avoid sharing personal information for your privacy.
                                </p>
                            </div>

                            {/* Clear Chat Button */}
                            <button 
                                className='w-full group relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/25'
                                onClick={clearChat}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex items-center justify-center gap-2">
                                    <Trash2 className='w-5 h-5' />
                                    <span>Clear Conversation</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className='flex-1 flex flex-col h-full'>
                        {/* Chat Header */}
                        <div className='bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 mb-4 shadow-xl'>
                            <div className='flex items-center justify-center gap-3'>
                                <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'>
                                    <Sparkles className='w-5 h-5 text-white' />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        GPT-3.5 Turbo
                                    </h1>
                                    <p className='text-slate-400 text-sm'>AI-Powered Assistant</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className='flex-1 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 mb-4 overflow-hidden'>
                            <div className='chatdiv h-full overflow-y-auto overscroll-behavior-y-auto custom-scrollbar'>
                                <div className='flex flex-col gap-3 pb-4'>
                                    {Entiremessage.map(({ role, content }, index) => {
                                        return <ChatBlocks key={index} role={role} content={content} />
                                    })}
                                    <div ref={bottomOfPanelRef}></div>
                                </div>
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className='bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-xl'>
                            <div className='flex gap-3'>
                                <div className='flex-1 relative'>
                                    <input 
                                        type="text" 
                                        name="message" 
                                        value={formdata.message} 
                                        onChange={onChangeHandler} 
                                        placeholder="Type your message here..."
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                onSubmitHandler(e);
                                            }
                                        }}
                                    />
                                </div>
                                <button 
                                    onClick={onSubmitHandler}
                                    className='group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <AiOutlineSend className='w-5 h-5 relative z-10' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(51, 65, 85, 0.3);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.7);
                }
            `}</style>
        </div >
    )
}

export default ChatRoom