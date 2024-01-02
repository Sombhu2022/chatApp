import React from 'react'
// import dp from'../../../images/download.jpeg'

function ChatReciver({name , dp}) {
  return (
    <div className='chat_reciver'>
         <div className="image_container">
            <img src={dp} alt="" />
         </div>
         <div className="name_container">
            <p>{name}</p>
            <p>30 min ago</p>
         </div>
    </div>
  )
}

export default ChatReciver