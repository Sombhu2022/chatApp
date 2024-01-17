import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import ChatReciver from "./components/ChatReciver";
import SendMessage from "./components/SendMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";
import { base_url } from "../../App";
import axios from "axios";
import { useSelector } from "react-redux";

const socket = io("http://localhost:8080/", { transports: ["websocket"] });



function Chat({ name, dp, email , key }) {
  const [message, setMessage] = useState();
  const [allMsg, setAllMsg] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [serverMsg, setServerMsg] = useState([]);
  const [serverMsgActivate , setServerMsgActivate]=useState(false)

  const [reciverId , setReciverId]=useState()


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
      // setCurrentUser(data.data.user)
      // console.log(data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allMessage();
    onlineUsers.forEach((value)=>{
      if(value.user.email === reciver.email){
        console.log("soket id is " , value.socketId , value.user)
        setReciverId(value.socketId)
      }
    })
  }, [reciver.email]);

  // console.log(currentUser);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connect", socket.id);
    });

    socket.emit("user-join", currentUser);

    socket.on("wellcome-user", (users) => {
      console.log("wellcome to chat room", users); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("user_connect_msg", (users) => {
      console.log("online user are", users); // x8WIv7-mJelg7on_ALbx
      setOnlineUsers(users);
    });
  }, []);

 


  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit("msg-send", { message, reciver, currentUser , reciverId   });
    try {
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
      setServerMsgActivate(true)
      
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    socket.on("msg_show", (ioMsg) => {
      console.log("io message", ioMsg);
      setServerMsg(ioMsg);
    });
    setMessage(" ")

  } ,[serverMsgActivate])

  return (
    <div className="chat_box">
      <ChatReciver name={name} dp={dp}  />

      <div className="msg_container">
        {allMsg?.map((ele) => {
          if (ele.sender.name === reciver.name) {
            return (
              <div className="left">
                <p>{ele.message}</p>
              </div>
            );
          } else if (ele.reciver.name === reciver.name) {
            return (
              <div className="right">
                <p>{ele.message}</p>
              </div>
            );
          }
        })}

        {
        serverMsg?.map((ele) => {
          if (ele.msg.currentUser.email === reciver.email ) {
            return (
              <div className="left">
                <p>{ele.msg.message}</p>
              </div>
            );
          } else if (ele.msg.reciver.email === reciver.email ) {
            return (
              <div className="right">
                <p>{ele.msg.message}</p>
              </div>
            );
          }
        })}
      



      </div>

      <div className="send_box_container">
        <form action="">

          <input
            type="text"
            placeholder="Message..."
            onChange={messageHandaler}
            value={message}
            
          />
        <button type="submit" className="send_button" onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane}  className="icon"/>
        </button>
        </form>
          
      </div>
    </div>
  );
}

export default Chat;
