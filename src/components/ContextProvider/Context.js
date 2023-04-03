import React, { createContext, useState } from 'react'


export const LoginContext = createContext("");

const Context = ({children}) => {

    const [logindata,setLoginData] = useState("");
    const [ allEmpData, setAllEmpData ] = useState([]);
    const [ empStatus, setEmpStatus] = useState([0,0,0,0]);
    const [ empAge, setEmpAge] = useState([0,0,0,0,0]);

  return (
    
    <LoginContext.Provider value={{logindata,setLoginData,allEmpData, setAllEmpData, empStatus,setEmpStatus,empAge, setEmpAge}}>
        {children}
    </LoginContext.Provider>
    
  )
}

export default Context