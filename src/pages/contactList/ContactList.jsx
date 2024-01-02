import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../App";
import { toast } from "react-toastify";
import Contact from "./components/Contact";

import './contactList.scss'

function ContactList() {
  const [users, setUsers] = useState();
  const allusers = async () => {
    try {
      const { data } = await axios.get(`${base_url}/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUsers(data.user);
      toast.success(data.message);
      console.log(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allusers();
  }, []);

  return (
    <div className="contact_container">
      <div className="searchbar">
        <input type="text" placeholder="search name" />
        <button>ok</button>
      </div>
      {users &&
        users.map((ele) => {
            return(
                <>
                <Contact key={ele._id} name={ele.name} dp={ele.dp.url}/>
                </>
            )
        })}
    </div>
  );
}

export default ContactList;
