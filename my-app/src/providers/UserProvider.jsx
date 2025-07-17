import React, { createContext,useContext, useState,useEffect } from 'react';
import { axiosClient2 } from '../api/axios2';

const UserContext  = createContext(null);

const UserProvider = ({ children }) => {
    const [user ,setUser]=useState([])
    const [count ,setCount]=useState(0)
    const [reload ,setReload]=useState(0)
    const [countMessage ,setCountMessage]=useState()

  useEffect(()=>{
fetchQuestions()
  },[reload])

  
  useEffect(()=>{
    fetchUser()
  },[count])



  const fetchQuestions=async()=>{
    try {
        const response=await axiosClient2.get(`api/notification`);
        if(response.status==="failed"){
            console.log("failed fetch",response.data.message)
        }else{
          setCountMessage(response.data.data)
            console.log(response)
  
        }
    } catch (error) {
        if(error.response){
            console.error("Response Error",error.response.data)
            console.error("Status Error",error.response.status)
            console.error("Headers",error.response.headers)
        }else if(error.request){
            console.error("Request Error" ,error.request)
        }else{
            console.error("general Error" ,error.message)
        }
    }
}

    const fetchUser=async()=>{
      try {
        const response = await axiosClient2.get("api/user/auth");
        if(response.status==="failed"){
          console.log("failed fetch",response.data.message)
      }else{
        setUser(response.data.user)
      } }catch (error) {
        if(error.response){
          console.error("Response Error",error.response.data)
          setUser([])
          console.error("Status Error",error.response.status)
          console.error("Headers",error.response.headers)
      }else if(error.request){
          console.error("Request Error" ,error.request)
      }else{
          console.error("general Error" ,error.message)
      }
      }
    }
    

  const contextValues ={
    user,
    count,
    setCount,
    countMessage,
    reload,
    setReload,
  }
  return (
    <UserContext.Provider value={contextValues}     >
      {children}
    </UserContext.Provider>
  );


};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider ,useUserContext };
