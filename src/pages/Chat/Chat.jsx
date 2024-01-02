import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import ChatReciver from "./components/ChatReciver";
import SendMessage from "./components/SendMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";
import { base_url } from "../../App";
import axios from "axios";


// const BaseUrl = "http://localhost:5000/";
// const socket = io(base_url, { transports: ["websoket"] });

function Chat({ name, dp, email }) {
  const [message, setMessage] = useState();
  const [allMsg, setAllMsg] = useState([]);
  const [currentUser , setCurrentUser] = useState({});
  const [onlineUsers , setOnlineUsers] = useState([]);
  const [serverMsg , setServerMsg]=useState();
  const socket = useRef(null)

  const messageHandaler = (e) => {
    setMessage(e.target.value);
  };

  const reciver = {
    name: name,
    email: email,
  }; 

  const allMessage = async () => {
    try {
      const data = await axios.post(
        `${base_url}/chat/msg`,
        { reciver },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAllMsg(data.data.chat);
      setCurrentUser(data.data.user)
      console.log(data.data.user);    
    } catch ( error ) {
      console.log(error);
    }
  };

  useEffect(() => {
    allMessage();
   
  }, []);


  console.log(currentUser);
  useEffect(()=>{
    
    socket.current = io(base_url , { transports:['websocket']})
    socket.current.on('connect' , (user)=>{
       console.log(user);})

  socket.current.emit('user-join' , currentUser)
  socket.current.on("user-join", (users) => {

    console.log(users); // x8WIv7-mJelg7on_ALbx
    setOnlineUsers(users)
  });
},[currentUser])

console.log(onlineUsers)

  // socket.current.on('msg_show' ,(message)=>{
  //   setServerMsg(serverMsg.push(message))
  // })

  const sendMessage = async () => {
    try {
      socket.current.emit('msg-send' ,  { message, reciver }  )
      const data = await axios.post(
        `${base_url}/chat`,
        { message, reciver },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat_box">
      <ChatReciver name={name} dp={dp} />

      <div className="msg_container">
      {allMsg?.map((ele) => {
        if (ele.sender.name === reciver.name) {
          return (
            <div className="left">
              <p >
             
              {ele.message}
              </p>
            </div>
          );
        } else {
          return (
            <div className="right">
              <p >
              {ele.message}
              </p>
            </div>
          );
        }
     })}
       {serverMsg?.map((ele)=>{
        if (ele.reciver === reciver) {
          return (
            <div className="left">
              <p >
              
              <span>{ele.message.message}</span>
              </p>
            </div>
          );
        } else {
          return (
            <div className="right">
              <p >
              
              <span>{ele.message.message}</span>
              </p>
            </div>
          );
        }
      })}
      
      </div>
      
      <div className="send_box_container">
        <div className="send_box">
          <input
            type="text"
            placeholder="Message..."
            onChange={messageHandaler}
            value={message}
          />
        </div>
        <div className="send_button" onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
