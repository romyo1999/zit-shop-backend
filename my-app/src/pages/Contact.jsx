import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import { axiosClient2 } from '../api/axios2';
import {  Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
    const [fullName ,setFullName]=useState('');
    const [Email ,setEmail]=useState('');
    const [Message ,setMessage]=useState('');
    const [spineer,setSpineer]=useState(false);
    const [Errors,SetErrors]=useState([]);


    const handleContact=async(e)=>{
        e.preventDefault();
       const Data={
        full_name:fullName,
        email:Email,
        message:Message
       }
       
       try {
        setSpineer(true)
        const response =await axiosClient2.post('api/contact',Data);
        toast.success("your message sent successfuly")
        console.log(response);
        setSpineer(false)
        SetErrors([])
        setEmail('')
        setFullName('')
        setMessage('')
        axiosClient2.post("api/notification",{
          message:1,
         }).then((res)=>{console.log(res)})
       } catch (error) {


        if (error.response) {
          toast.error("Please try Again")
          console.error('Response Error:', error.response.data);
          SetErrors(error.response.data.errors)
          console.log(error.response.data.errors)
          // toast.error('Failed to createc a product');

          console.error('Status Code:', error.response.status);
          console.error('Headers:', error.response.headers);
      } else if (error.request) {

          console.error('Request Error:', error.request);
      } else {

          console.error('General Error:', error.message);
      }
      setSpineer(false)

       }
    }
    
    
  return (
    <div className='container-fluid ' style={{background:"silver"}}>
        <div className='row'>
        <div className='col-lg-6 col-md-10 col-sm-12 mx-auto  card' style={{marginTop:"3%",marginBottom:"10%" ,boxShadow:'0 0 10px ' }}>
            <h2 className='text-center text-secondary card-header' >Contact Us</h2>
            <form onSubmit={(e)=>{handleContact(e)}} className='card-body d-flex flex-column'>
            <p className='text-dark  fs-4 text-center'>
Questions or issues? We're here to help! Use the form below for quick assistance from our support team. Your satisfaction is our priority!
            </p>
            <Input
            label="Full Name"
            required={true}
            placeholder="enter your full Name"
            type="text"
            setVar={setFullName}
            var={fullName}
            error={Errors.full_name?true:false}

            />
            <small style={{ marginLeft:"40%",color:"red",fontWeight:"bold"  ,width:"100%"}}>{Errors.full_name}</small>


            <Input
            label="Email"
            required={true}
            placeholder="enter your Email"
            type="email"
            setVar={setEmail}
            var={Email}
            error={Errors.email?true:false}

            />
            <small style={{ marginLeft:"40%",color:"red",fontWeight:"bold"  ,width:"100%"}}>{Errors.email}</small>

            <TextArea
            label=" Message "
            required={true}
            placeholder="entre your problem"
            type="text"
            setVar={setMessage}
            var={Message}    
            error={Errors.message?true:false}

            />
            <small style={{ marginLeft:"40%",color:"red",fontWeight:"bold"  ,width:"100%"}}>{Errors.message}</small>

            <button    type='submit' className='btn btn-primary fs-4  w-100 mt-4 mb-4' style={{fontWeight:'bold'}}>
            {
              spineer?(
                <Spinner/>
              ):(
                "Send"
              )
            }

            </button>
            </form>
        </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Contact