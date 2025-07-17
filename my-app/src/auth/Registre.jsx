import React, {  useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { axiosClient } from '../api/axios';
import { Button, Spinner } from 'react-bootstrap';

import { useUserContext } from '../providers/UserProvider';
import { useCartContext } from '../providers/CartProvider';
const Registre = () => {

    const [firstName ,setFirstName]=useState("");
    const [lastName ,setLastName]=useState("");
    const [Email ,setEmail]=useState("");
    const [Password ,setPassword]=useState("");
    const [color ,setColor]=useState("silver");
    const [Errors ,setErrors]=useState({})
    const [loading ,setLoading]=useState(false)
    const navigate =useNavigate()
    const {count ,setCount}=useUserContext();
    const {refresh ,setrefresh}=useCartContext()


    const handleRegistre=async(e)=>{
        e.preventDefault();
        const data={
            first_name:firstName,
            last_name:lastName,
            email:Email,
            password:Password,
        }
 
        try {
            setLoading(true)
            const response =await axiosClient.post('/api/register',data);
            setCount(count+1)
            setrefresh(refresh)
            console.log(response.data)
            navigate("/dashboard")
        }catch(error){
            if (error.response) {

                console.error('Response Error:', error.response.data.errors);
                setErrors(error.response.data.errors)
                console.error('Status Code:', error.response.status);
                console.error('Headers:', error.response.headers);
                setEmail("")
                setFirstName("")
                setLastName("")
                setPassword("")
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
                <h2 className='text-center font-weight-bold'>REGISTRE</h2>
            </div>
            <div className='card-body w-100'>
                <form onSubmit={(e)=>{handleRegistre(e)}}>
                    <div className='form-group mt-3'>
                        <label className='fs-4' htmlFor="first_name">First Name<span style={{color:"red"}}>*</span></label>
                        <input id='first_name' type='text' value={firstName} required placeholder='Enter your first name ' className='form-control ' onChange={(e)=>{setFirstName(e.target.value)
                        Email && Password && lastName ? setColor("blue") : setColor("gray")
                        }}/>
                        <small className='text-danger text-center'>
                        {
                            Errors.first_name
                        }
                        </small>
                    </div>
                    <div className='form-group mt-3'>
                        <label className='fs-4' htmlFor="last_name">Last Name<span style={{color:"red"}}>*</span></label>
                        <input id='last_name' type='text' value={lastName} required placeholder=' Enter your last name ' className='form-control ' onChange={(e)=>{setLastName(e.target.value)
                        Email && firstName && Password ? setColor("blue") : setColor("gray")
                        }}/>
                        <small className='text-danger text-center'>
                        {
                            Errors.last_name
                        }
                        </small>
                    </div>
                    <div className='form-group mt-3'>
                        <label className='fs-4' value={Email} htmlFor="email">Email<span style={{color:"red"}}>*</span></label>
                        <input id='email' type='email' required placeholder='Email Address' className='form-control ' onChange={(e)=>{setEmail(e.target.value)
                        Password && firstName && lastName ? setColor("blue") : setColor("gray")
                        }}/>
                        <small className='text-danger text-center'>
                        {
                            Errors.email
                        }
                        </small>
                    </div>
                    <div className='form-group mt-3 '>
                        <label className='fs-4' htmlFor="Password">Password<span style={{color:"red"}}>*</span></label>
                        <input id='password' value={Password} type='password' required placeholder='Enter Password' className='form-control  ' onChange={(e)=>{setPassword(e.target.value)
                        Email && firstName && lastName ? setColor("blue") : setColor("gray")
                        }}/>
                        <small className='text-danger text-center'>
                        {
                            Errors.password
                        }
                        </small>
                    </div>
                    <Button type='submit'className='btn mb-2 p-2 btn-block w-100 text-center text-white mt-3 fs-3' style={{background:color ,border:0}} >
                    {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-1" />}
                    {loading ? '' : 'Sign up'}
                    </Button>                </form>
                <div className='d-flex align-items-center justify-content-center mt-3'>
                        <span>already have an account?</span><Link className='text-warning' to={"/login"}>Sign in</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Registre
