import React, { useContext } from 'react'
import { ConterContext , useCounter} from '../../context/Counter'
function CounterCheck() {

    // const counter = useContext(ConterContext)
    const counter = useCounter()
    // const counter = useCounter()
    console.log(counter)

  return (
    <div>
      <h1  > {counter.count}</h1>
        <button onClick={()=>{
          counter.setCount(counter.count+1)
        }}>increment</button>
        <button
        onClick={()=>{
          counter.setCount(counter.count-1)
        }}>decrement</button>
    </div>
  )
}

export default CounterCheck