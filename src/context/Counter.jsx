import React, { createContext, useContext, useState } from 'react'


export const ConterContext = createContext(null)

export const useCounter=()=> {
 return useContext(ConterContext);
}
  

function Counter(props) {
  const [count, setCount] = useState(5);
  return (
    <ConterContext.Provider value={ {count, setCount} }>
       { props.children}
    </ConterContext.Provider>
  )
}

export default Counter