import React, { useEffect, useState } from "react";
import ContactList from "../contactList/ContactList";
import Chat from "../Chat/Chat";
import "./home.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../App";
import Contact from "../contactList/components/Contact";
import { socket } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, logoutUser } from "../../redux/slice/user/userController";
import { useNavigate , Link} from "react-router-dom";

function Home() {
  // const [users, setUsers] = useState();
  const [reciver , setReciver] = useState();
  const dispatch = useDispatch();
  const users = useSelector((state)=>state.users)
  const authenticate = useSelector(state => state.isAuthenticate)
  const navigate = useNavigate();
  

  const allusers = async () => {
    try {
      dispatch(allUsers())
      // setUsers(data.user);
      
      // console.log(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const changeReciver =(name , dp , email)=>{
      setReciver({
        name:name,
        dp:dp,
        email:email
      })
  }
  useEffect(()=>{
    if(!authenticate) navigate('/register');
    allusers();
  },[authenticate])

  const logoutHendaler = ()=>{
      dispatch(logoutUser())
  }
  // useEffect(() => {
   
  //   socket.on('user-connect-msg' , (user)=>{
  //     console.log("msg from server",user)
  //    })
  //    socket.on('wellcome-user' , (user)=>{
  //     console.log("wellcome user",user);
  //     })
     
  // }, [users]);

  return (
    <div className="main_div home_container">
      <div className="contact_container">
        
        <div className="searchbar">
        <button onClick={logoutHendaler}>Log out</button>
          <input type="text" placeholder="search name" />
          <button>ok</button>
        </div>
        {users &&
          users.map((ele) => {
            return (
              < >
                <Contact  onButtonClick={changeReciver} key={ele._id} name={ele.name} dp={ele.dp.url} email={ele.email} />
              </>
            );
          })}
      </div>
      <div className=' chat_container'>

      {reciver?<Chat name={reciver.name} dp={reciver.dp} email={reciver.email}/>:" select friend"
      }
      {/* <Chat /> */}
      </div>
    </div>
  );
}

export default Home;
