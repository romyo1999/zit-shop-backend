import React, { useState,useEffect } from 'react'
import { useCartContext } from '../providers/CartProvider'
import { useUserContext } from '../providers/UserProvider'
import TextArea from '../components/TextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit ,faArrowAltCircleLeft,faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { axiosClient2 } from '../api/axios2'
import { ToastContainer, toast } from 'react-toastify'
const CheckOut = () => {
    const {checkout}=useCartContext()
    const [updateLoading,setUpdatingLoading]=useState(false)
    const [error,setError]=useState("")
    const [message,setMessage]=useState("")
    const{user,count ,setCount}=useUserContext();
    const[address,setAddress]=useState(user.address)
    const navigate=useNavigate()
    console.log(checkout)
    
    if(Object.keys(checkout).length>0&&Object.keys(user).length>0){
        const handleAddress=async()=>{
            setUpdatingLoading(true)
            if(address){
                 const newAddress={
                "address":address
            }
            const response= await axiosClient2.put(`/api/user/address/${user.id}`,newAddress)
            toast.success("Address updated successf")
            setCount(count+1)
            console.log(response)
            setUpdatingLoading(false)
            setError('')
            }else{
                setError("empty !!")
                toast.error("Faield to Update")
                setUpdatingLoading(false)

            }
           

        } 
        const showCreditCard=()=>{
            document.getElementById('information').style.display="none"
            document.getElementById('creditcard2').style.display="block"
        }

        const showInformation=()=>{
            document.getElementById('creditcard2').style.display="none"
            document.getElementById('information').style.display="block"
        }

        return (
            <>
            {/* checkout information  */}
            <div className='container-fluid  ' id='information' style={{background:"silver" }}>
                <ToastContainer/>
                <div className='row mt-4'>
                    <div className='col-lg-8 col-md-10 col-sm-10 mx-auto card mt-4 mb-4 '>
                        <h3 className="text-secondary text-center card-header">Checkout</h3>
                        <div className=' mt-4 d-flex align-items-center justify-content-around'>
                           <h4 style={{fontWeight:"bold"}}>Items : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"#2980b9"}}>{checkout.count} Items</span></h4>
                           <h4 style={{fontWeight:"bold"}}>SubTotal  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"#2980b9"}}> {checkout.subTootal}$</span></h4>
        
                        </div>
                        
                        <div className=' mt-4 d-flex align-items-center justify-content-around'>
                           <h4 style={{fontWeight:"bold"}}>Discount  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"#2980b9"}}> {checkout.discount}%</span></h4>
                           <h4 style={{fontWeight:"bold"}}>As a Gift  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:checkout.gift?"#2980b9":"red"}}>{checkout.gift?"Yes":"No"} </span></h4>
                        </div>
        
                        
                        <div className=' mt-4 d-flex align-items-center justify-content-around'>
                           <h4 style={{fontWeight:"bold"}}>Shipping  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"#2980b9"}}> {checkout.shipping}$</span></h4>
                           <h4 style={{fontWeight:"bold"}}>Total  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"rgb(34, 34, 165)"}}> {checkout.tootal}$</span></h4>
                        </div>
        
                        <div className=' mt-4  d-flex align-items-center justify-content-center '>
                            <div style={{width:"90%"}} className='m-0 p-0 ms-4'>
                            <TextArea
                     
                            type='text'
                            label="Shipping Address"
                            placeholder="enter your address"
                            var={address}
                            setVar={setAddress}
                            error={error?true:false}
                            />
                           <small style={{textAlign:"end",fontSize:"15px" ,color:"red",fontWeight:"bold",width:'100%',marginLeft:"250px"}}>{error}</small>

                            </div>
                          <button  onClick={handleAddress} style={{width:"16%" ,marginRight:"80px"}} className=' btn btn-success '>
                           {
                            updateLoading?(
                                <Spinner style={{width:"15px" ,height:"15px"}}/>
                            ):(
                                <>
                                  <FontAwesomeIcon icon={faEdit}/>  Update
                                </>
                              
                            )
                           }
                           
                           </button>
                          </div>
        
                          <hr/>
                          <div className=' mt-4 d-flex align-items-center justify-content-center'>
                            <button onClick={showCreditCard} className='btn btn-primary' style={{width:"70%" ,fontWeight:"bolder"}}>Pay by Credit Card</button>
                        </div>
                        <div className="horizontal-line">
                        <div className="line"></div>
                        <div className="text fs-4">or</div>
                        <div className="line"></div>
                        </div>
                        <div className=' mb-4 d-flex align-items-center justify-content-center'>
                            <button style={{width:"70%",color:"blue",fontSize:"large",fontWeight:"bolder",fontStyle:'italic'}} className='btn btn-warning'> Pay <span style={{color:"rgb(42, 119, 192)"}}>Pal</span></button>
                        </div>
        
        
                    </div>
                </div>
            </div>




            {/* creditcard  */}
            <div className='container-fluid mt-4' id='creditcard2' >
                <div className='d-flex flex-column align-items-center justify-content-center w-100'>
                    <div className='w-50'>
                    <FontAwesomeIcon onClick={showInformation} className='fs-3 btn-hover' icon={faArrowAltCircleLeft}/>
                    </div>
                           <h2 style={{fontWeight:"bold" }}>Credit card <FontAwesomeIcon className='ms-2 fs-3' icon={faCreditCard}/> </h2>
                           <div className='line-under' style={{borderBottom:"2px" ,borderBottomStyle:'solid',borderBottomColor:"silver"}}></div>
                           <div className='mt-4 credit-cart '   >
                            <h4 style={{fontWeight:"bold" ,color:" #2b2b2c"}}>Credit card number</h4>
                            <input placeholder='1 2 3 4    1 2 3 4     1 2 3 4     1 2 3 4' type='text' className='form-control w-100' style={{boxShadow:"0 0 3px"}}/>
                           </div>

                           <div className='mt-4 d-flex  align-items-center justify-content-around credit-cart '   >

                           <div>
                           <h4 style={{fontWeight:"bold" ,color:" #2b2b2c"}}>Expiry Date</h4>
                            <input placeholder='M M  /  Y Y' type='text' className='form-control w-100 credit-cart' style={{boxShadow:"0 0 3px"}}/>
                           </div>

                           <div>
                           <h4 style={{fontWeight:"bold" ,color:" #2b2b2c"}}>CVC</h4>
                            <input placeholder='C V C' type='text' className='form-control w-100' style={{boxShadow:"0 0 3px"}}/>
                           </div>
                           </div>

                           <div className='mt-4 d-flex  align-items-center justify-content-between credit-cart' >
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" grey"}}>{checkout.count} Items</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:" grey"}}>{checkout.subTootal}$</h4>
                           </div>

                           <div className='mt-4 d-flex  align-items-center justify-content-between credit-cart' >
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" grey"}}>Shipping</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:" grey"}}>{checkout.shipping}$</h4>
                           </div>

                           {checkout.discount ===0?(
                            <span></span>
                           ):(
                            <div className='mt-4 d-flex align-items-center justify-content-between credit-cart' >
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" grey"}}>Discount</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:" grey"}}>{checkout.discount}%</h4>
                           </div>
                           )
                           }


                           <div className='mt-4 d-flex  align-items-center justify-content-between credit-cart' >
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" black"}}>Total</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:"blueviolet"}}>{checkout.tootal}$</h4>
                           </div>

                           <div className='line-under' style={{borderBottom:"2px" ,borderBottomStyle:'solid',borderBottomColor:"silver"}}></div>
               
                           <p className='text-secondary mt-3'>
                            by i clicking pay .i agree to zit-shop <br/>
                            zit-shop<Link to={"/user_argement"}> user Argement</Link>
                           </p>
                           <button className='btn btn-primary mt-4 fs-4 ' style={{width:'33%',fontWeight:"bold"}}>Pay ${checkout.tootal}</button>
               
                </div>

            </div>








            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            </>
          )
    }else{
       
    
        return(
            <div className='mt-4 d-flex align-items-center justify-content-center'>
                {
                    Object.keys(checkout).length>0?(
                        <div className='w-50 mx-auto mt-4'>
                        <h3 className='text-center'>Please Sign in  First </h3>
                        <div className='d-flex align-items-center justify-content-center mt-4'>
                        <Link className='text-white text-decoration-none  btn btn-info d-inline-block me-4' to="/registre">Registre</Link>
                        <Link className=' text-decoration-none btn btn-primary ps-4 pe-4' to="/login">Login</Link>
                        </div>
                        </div>
                    ):(
                        <div className='w-50 mx-auto mt-4'>
                        <h3 className='text-center'>Nothing to buy </h3>
                        <div className='d-flex align-items-center justify-content-center mt-4'>
                        <Link className='text-white text-decoration-none  btn btn-info d-inline-block me-4' to="/">Home</Link>
                        </div>
                        </div>
                    )
                }

            </div>
        )
    }
  
}

export default CheckOut
