import React from 'react'
import Item from './Item'

import { useCard } from '../../context/CardContext'
import Acount from './Acount';

function Card() {
    const data=useCard();
    console.log(data)
  return (
    <div>
        <Item name={"sombhu"} prise={100}/>
        <Item name={"sombhu"} prise={200}/>
        <Item name={"sombhu"} prise={300}/>
        <Item name={"sombhu"} prise={400}/>
         <Acount/>  
    </div>
  )
}

export default Card