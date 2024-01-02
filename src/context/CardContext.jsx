import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const card = createContext(null)
export const useCard = ()=>{
 return useContext(card)
}

function CardContext(props) {
    const [data , setData]=useState([])
  return (
    <card.Provider value={{data , setData}}>
         {props.children}
    </card.Provider>
  )
}

export default CardContext