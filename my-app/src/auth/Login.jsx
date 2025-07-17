import React, { useEffect, useState } from 'react'
import {Form, Link, useNavigate} from "react-router-dom"
import { axiosClient } from '../api/axios';
import { Button, Spinner } from 'react-bootstrap';
import { useUserContext } from '../providers/UserProvider';
import { useCartContext } from '../providers/CartProvider';

const Login = () => {
    const [inputEmail ,setEmail]=useState("");
    const [inputPassword ,setPassword]=useState("");
    const [color ,setColor]=useState("silver");
    const [Errors ,setErrors]=useState("")
    const [loading ,setLoading]=useState(false)
    const navigate=useNavigate();
    const {user,count ,setCount}=useUserContext();
    const {refresh,setrefresh}=useCartContext()
    console.log(refresh)
    
    // useEffect(()=>{
    //     if(Object.keys(user).length>0){
    //         navigate("/home")
    //     }else{
    //         setCount(count+1)
    //     }
    // },[])

    const handleLogin=async(e)=> {
    e.preventDefault();
    const data ={
        email:inputEmail,
        password:inputPassword
    }

    try {
        setLoading(true);
        const response = await axiosClient.post('/api/login' ,data);
        if (response.data.status === 'failed') {
            // Authentication failed
            console.error('Login failed:', response.data.message);
            // You might want to display an error message to the user
        } else {
            // Authentication successful
            setCount(count+1)
            console.log('Login successful:', response.data);
            navigate('/dashboard')
            setrefresh(refresh+1)

            
        }       
    }catch (error) {
        if (error.response) {

            console.error('Response Error:', error.response.data);
            setErrors(error.response.data.message)
            setEmail(""),
            setPassword("")
            setColor("silver")
            console.log(Errors)
            console.error('Status Code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {

            console.error('Request Error:', error.request);
        } else {

            console.error('General Error:', error.message);
        }
    }
    setLoading(false)




}
  return (
    <div className='container mt-4 '>
      <div className='row mt-4'>
        <div className='mx-auto  col-lg-8 mt-4 card border-0'>
            <div className='card-head'>
                <h2 className='text-center font-weight-bold'>LOGIN</h2>
            </div>
            <div className='card-body w-100'>
                <div style={{color:"red" ,textAlign:"center" ,fontFamily:"verdana" ,fontSize:"large"}}>{ Errors?"Invalid email or password":"" }</div>
                <form onSubmit={(e)=>{handleLogin(e)}}>
                    <div className='form-group mt-3'>
                        <label className='fs-4' htmlFor="email">Email<span style={{color:"red"}}>*</span></label>
                        <input id='email' type='email' value={inputEmail} required placeholder='Email Address' className='form-control ' onChange={(e)=>{setEmail(e.target.value)
                        inputPassword?setColor("blue"):setColor("gray")
                        }}/>
                    </div>
                    <div className='form-group mt-3 fs-4'>
                        <label htmlFor="Password">Password<span style={{color:"red"}}>*</span></label>
                        <input id='password' type='password' value={inputPassword} required placeholder='Enter Password' className='form-control  ' onChange={(e)=>{setPassword(e.target.value)
                        inputEmail?setColor("blue"):setColor("gray")
                        }}/>
                    </div>
                    <Button type='submit'className='btn mb-2 p-2 btn-block w-100 text-center text-white mt-3 fs-3' style={{background:color ,border:0}} >
                    {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-1" />}
                    {loading ? '' : 'Sign in'}
                    </Button>
                </form>
                <div className='d-flex align-items-center justify-content-center mt-3 border-0'>
                        <span>Don’t have an account?</span><Link className='text-warning' to={"/registre"}>Sign up</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
