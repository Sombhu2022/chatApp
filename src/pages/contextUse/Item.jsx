import React from 'react'
import { useCard } from '../../context/CardContext'
function Item({name , prise}) {
    const data = useCard();
  return (
    <div>
        <h2>{name}</h2>
        <p>{prise}</p>
        <button onClick={()=>data.setData([...data.data ,{"name":name , "prise":prise}])} >Add Card</button>
    </div>
  )
}

export default Item