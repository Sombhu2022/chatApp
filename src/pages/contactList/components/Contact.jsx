import React from 'react'

function Contact({name , dp , onButtonClick , email , key}) {
  return (
    <div className='contacts' onClick={()=>onButtonClick(name , dp , email , key)}>
        <div className='image_container'>
            <img src={dp} alt="" />
        </div>
        <div className='name_container'>
            <p>{name}</p>
            
        </div>
    </div>
  )
}

export default Contact