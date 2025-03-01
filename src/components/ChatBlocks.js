import React from 'react'
import myimg from '../Assets/intervai.png'
const ChatBlocks = ({role,content}) => {
  return (
    <div className='w-full flex items-start md:gap-7 sm:gap-5 gap-3 p-4 bg-[rgb(11,119,98)] rounded-md '>
          {role === 'user' ?
          <img src="https://ui-avatars.com/api/?name=vivek+Kushwaha" alt="" className='rounded-full w-10' />
        : <img src={myimg} className=' rounded-full w-10'></img>}
          <p className='text-white sm:text-lg font-semibold '>{content}</p>
    </div>
  )
}

export default ChatBlocks
