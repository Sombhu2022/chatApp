import React from "react";
import { useCard } from "../../context/CardContext";

function Acount() {
  const data = useCard();
  return(<div>
    {
        data.data && data.data.map((ele,index)=>{
            return(
            <div key={index}>
            <p>
                {ele.name}
            </p>
            <p>
                {ele.prise}
            </p>
            </div>
            )

        })
    }
    </div>);
}

export default Acount;
