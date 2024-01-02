import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


function SendMessage() {
  return (
    <div className='send_box_container'>
       <div className="send_box">
        <input type="text"  placeholder='Message...'/>
       </div>
       <div className="send_button">
       <FontAwesomeIcon icon={faPaperPlane} />
       </div>
    </div>
  )
}

export default SendMessage