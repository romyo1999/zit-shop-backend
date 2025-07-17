import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { axiosClient } from '../api/axios'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate =useNavigate()
    const [data ,setData]=useState({});
    const [login ,setLogin]=useState('false')

    useEffect(()=>{
        checkAuthentication()
    },[])

    const fetchUser=async ()=>{
        const user = await axiosClient.get("/api/dashboard");
        setData(user)
        console.log(data)
    }


const checkAuthentication = async () => {
    try {
        const response = await axiosClient.get('/api/dashboard');
        console.log(response.data);
        setLogin(true)
    } catch (error) {
        if (error.response) {

            console.error('Response Error:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {

            console.error('Request Error:', error.request);
        } else {

            console.error('General Error:', error.message);
        }
        navigate('/login')

    }
};




   if (login === true){

      return (
    <div>
      you are loged in
    </div>
  )
   }

}

export default Dashboard
