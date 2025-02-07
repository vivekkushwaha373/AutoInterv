import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import robot from '../Assets/robot.png'
import logo from '../Assets/intervai.png'

const Home = () => {
    const codeblock = `<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\n<h1><ahref="/">Header</a>\n</h1>\nnav><ahref="one/">One\n</a><ahref="two/">Two\n</a><ahref="three/">Three</a>nav>`;
    
    return (
      
    <div className='w-full bg-gray-950 h-full'>
            <div className="sm:w-9/12 w-11/12 mx-auto text-center ">

                <h1 className='text-white font-bold'>
                    <TypeAnimation

                        sequence={[
                            'Your Own Customised IntervAI', // Types the first message
                            1000, // Waits for 1 second
                            '', // Clears the message (deletes)
                            1000, // Wait for 1 second before typing the next message
                            'With ChatBot Support', // Types the second message
                            1000, // Waits for 1 second
                            '', // Clears the message (deletes)
                            1000, // Wait for 1 second before repeating
                        ]}
                        wrapper="span"
                        speed={70} // Speed of typing and deleting
                        repeat={Infinity} // Repeat the animation infinitely
                        style={{ fontSize: '2em', display: 'inline-block' }}
                    />

                </h1>

                <div className='flex justify-between w-full pt-2'>
                    <div >
                        <img src={robot} alt=""  className=' w-0 sm:w-[250px]' />
                    </div>

                    <div>
                        <img src={logo} alt="" className='GPTLogo animate-spin-slow w-0 sm:w-[250px] '/>
                    </div>

                </div>

                <div className='flex border lg:w-[50%] mx-auto bg-gray-900 p-4 rounded-lg shadow-rose-900 overflow-auto'>
                    <div className='font-bold text-right text-lg text-white'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    <div className='text-left px-5 text-lg text-yellow-600 font-bold'>
                        <TypeAnimation
                            sequence={[codeblock, 5000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            style={
                                {
                                    whiteSpace: "pre-line",

                                }
                            }
                        />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Home
