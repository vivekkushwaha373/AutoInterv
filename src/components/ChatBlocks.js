import React, { useContext } from 'react'
import myimg from '../Assets/intervai.png'
import { AppContext } from '../context/AppContext'

const ChatBlocks = ({role,content}) => {
  const { user } = useContext(AppContext)
  let firstName = user?.firstname || 'User'
  let lastName = user?.lastname || 'Name'

  return (
    <div className='w-full flex items-start md:gap-7 sm:gap-5 gap-3 p-4 bg-[rgba(89,131,214,0.76)] rounded-md '>
          {role === 'user' ?
        <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="" className='rounded-full w-10' />
        : <img src={myimg} className=' rounded-full w-10'></img>}
          <p className='text-gray-200 sm:text-lg font-[cursive] '>{content}</p>
    </div>
  )
}

export default ChatBlocks
