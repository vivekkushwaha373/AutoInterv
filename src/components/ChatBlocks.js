import React from 'react'
import myimg from '../Assets/intervai.png'
const ChatBlocks = ({role,content}) => {
  return (
    <div className='w-full flex items-center gap-7 p-4 bg-[rgb(11,119,98)] rounded-md '>
          {role === 'user' ?
          <img src="https://ui-avatars.com/api/?name=vivek+Kushwaha" alt="" className='rounded-full w-10' />
        : <img src={myimg} className='rounded-full w-10'></img>}
          <p className='text-white text-lg font-semibold '>{content}</p>
    </div>
  )
}

export default ChatBlocks
