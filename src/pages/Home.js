"use client"
import { TypeAnimation } from "react-type-animation"
import robot from "../Assets/robot.png"
import logo from "../Assets/intervai.png"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { isLoggedIn} = useContext(AppContext)
    const navigate = useNavigate()
    const handler = () => { 
        if (isLoggedIn) {
            navigate("/interformpage")
        } else {
            navigate("/login")
        }
    }

    const codeblock = `<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css"></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav></body></html>`

    return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden'>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fillOpacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

            
<div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="mb-8">
                            <h1 className='text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6'>
                                <TypeAnimation
                                    sequence={[
                                        'Your Own Customised IntervAI', 
                                        2000, 
                                        '', 
                                        500, 
                                        'With ChatBot Support', 
                                        2000, 
                                        '', 
                                        500, 
                                    ]}
                                    wrapper="span"
                                    speed={70}
                                    repeat={Number.POSITIVE_INFINITY}
                                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent"
                                />
                            </h1>
                            
                            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                Experience the future of AI-powered interviews with our advanced platform. 
                                Get personalized feedback, practice with real scenarios, and boost your confidence.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <button onClick={handler} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                Start Your Interview
                            </button>
                           
                        </div>
                    </div>

                    {/* Images Section */}
                   

                    {/* Code Block Section */}
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                See Our AI in Action
                            </h2>
                          
                        </div>

                        <div className='relative bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden'>
                            {/* Code editor header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-gray-800/50 border-b border-gray-700/50">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="text-gray-400 text-sm font-mono">
                                    index.html
                                </div>
                                <div className="w-16"></div>
                            </div>

                            {/* Code content */}
                            <div className='flex p-6 overflow-auto min-h-[300px]'>
                                <div className='font-mono text-right text-gray-500 select-none pr-6 border-r border-gray-700/50'>
                                    {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
                                        <p key={num} className="leading-7">{num}</p>
                                    ))}
                                </div>
                                
                                <div className='text-left px-6 font-mono text-lg overflow-auto'>
                                    <TypeAnimation
                                        sequence={[codeblock, 5000, ""]}
                                        repeat={Number.POSITIVE_INFINITY}
                                        cursor={true}
                                        omitDeletionAnimation={true}
                                        className="text-green-400"
                                        style={{
                                            whiteSpace: "pre-line",
                                            lineHeight: "1.75"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Glowing border effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
                            <p className="text-gray-400">Advanced AI technology for realistic interview simulations</p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Chat Support</h3>
                            <p className="text-gray-400">24/7 chatbot assistance for all your questions</p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                            <p className="text-gray-400">Detailed performance insights and improvement suggestions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
            
  )
}

export default Home
