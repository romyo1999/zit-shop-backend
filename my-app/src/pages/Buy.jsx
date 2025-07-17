import React, { useState,useEffect } from 'react'
import { useCartContext } from '../providers/CartProvider'
import { useUserContext } from '../providers/UserProvider'
import TextArea from '../components/TextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faCreditCard, faEdit, faGift } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
import { axiosClient2 } from '../api/axios2'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Buy = () => {
    const {buy}=useCartContext()
    const [updateLoading,setUpdatingLoading]=useState(false)
    const [error,setError]=useState("")
    const [message,setMessage]=useState("")
    const{user,count ,setCount}=useUserContext();
    const[address,setAddress]=useState("")
  const [shipping,setShipping]=useState(9)
  const [gift,setGift]=useState(false);
  const [errorType,setErrorType]=useState("");

  const navigate=useNavigate()


    console.log(buy)
    console.log(user)

    useEffect(() => {
    const createOrder = (data, actions) => {
      return fetch('/demo/checkout/api/paypal/order/create/', {
        method: 'post'
      })
        .then((res) => res.json())
        .then((orderData) => orderData.id);
    };

    const onApprove = (data, actions) => {
      return fetch(`/demo/checkout/api/paypal/order/${data.orderID}/capture/`, {
        method: 'post'
      })
        .then((res) => res.json())
        .then((orderData) => {
          const errorDetail = Array.isArray(orderData.details) && orderData.details[0];

          if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
            return actions.restart();
          }

          if (errorDetail) {
            let msg = 'Sorry, your transaction could not be processed.';
            if (errorDetail.description) msg += '\n\n' + errorDetail.description;
            if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
            return alert(msg);
          }

          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
          const transaction = orderData.purchase_units[0].payments.captures[0];
          alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
        });
    };

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder,
        onApprove
      }).render('#paypal-button-container');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
    
    if(Object.keys(user).length>0 && Object.keys(buy).length>0){

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
            document.getElementById('creditcard').style.display="block"
        }

        const showInformation=()=>{
            document.getElementById('creditcard').style.display="none"
            document.getElementById('information').style.display="block"
        }

        return (
            <>
                {/* item information  */}
                <div className='container-fluid  ' id='information' style={{background:"silver" }}>
                <ToastContainer/>
                <div className='row mt-4'>
                    <div className='col-lg-8 col-md-10 col-sm-10 mx-auto card mt-4 mb-4 '>
                        <h3 className="text-secondary text-center card-header">Checkout</h3>
                        <div className=' mt-4 d-flex align-items-center justify-content-around'>
                           <h4 style={{fontWeight:"bold"}}>Size : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"#2980b9"}}>{buy.size} </span></h4>
                           <h4 style={{fontWeight:"bold"}}>1 Item  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"#2980b9"}}> {buy.price}$</span></h4>
        
                        </div>

                        <form className='mb-3 w-100 d-flex align-items-center justify-content-center'>
                        <label htmlFor='standard'   className='d-flex align-items-center justify-content-around w-100 ps-4 pe-4 pt-2 pb-2 mt-2 '  style={{border:"2px",borderStyle:'solid',borderColor:shipping==9?"rgb(19, 60, 105)":"silver"}}>
                        <input type='radio'  checked={shipping==9?true:false} name='shipping' id='standard' value={9} onChange={(e)=>setShipping(e.target.value)} className='me-3 '/>
                        <div className='d-flex flex-column'>
                        <label htmlFor='standard' className='fs-5 mt-3' style={{fontWeight:"bold"}}><span style={{fontWeight:'bolder',color:"rgb(19, 60, 105)"}}>+$9 </span> Standard Shipping</label>
                        <small className='text-secondary'>Delivery Between 30 and 40 days</small>
                        </div>
                        </label>

                        <label htmlFor='express'  className='d-flex align-items-center justify-content-around w-100 ps-4 pe-4 pt-2 pb-2 mt-2'  style={{border:"2px",borderStyle:'solid',borderColor:shipping==40?"rgb(19, 60, 105)":"silver"}}>
                        <input type='radio'  name='shipping' id='express' value={40} className='me-3'  onChange={(e)=>setShipping(e.target.value)}/>
                        <div className='d-flex flex-column'>
                        <label htmlFor='express' className='fs-5 mt-3' style={{fontWeight:"bold"}}><span style={{fontWeight:'bolder',color:"rgb(19, 60, 105)"}}>+$40 </span> Express Shipping</label>
                        <small className='text-secondary'>Delivery Between 5 and 10 days</small>
                        </div>
                        </label>
                        </form>
                

                        <div className=' mt-4 d-flex flex-column  align-items-center justify-content-center'>
                            <label htmlFor='gift' className='p-2 d-flex align-items-center justify-content-center m-3' style={{border:"2px",borderStyle:"solid",borderColor:"rgb(44, 90, 105)",borderRadius:"10px"}}>
                            <input  type='checkbox' value={true} id='gift' name='gift' onChange={(e)=>{setGift(e.target.value)}} className='me-4'/>
                            <label style={{fontWeight:'bold',fontSize:"16px",fontFamily:"inherit"}} htmlFor='gift' className=''>this order is a gift </label>
                            <FontAwesomeIcon className='ms-3' icon={faGift}/>
                            </label>
                            <h4 className='mt-4' style={{fontWeight:"bold"}}>Total  : <span style={{fontFamily:"sans-serif" ,fontWeight:"bold",color:"rgb(34, 34, 165)"}}> {parseFloat(buy.price)+parseFloat(shipping)}$</span></h4>
                        </div>
        
                        <div className=' mt-2  d-flex align-items-center justify-content-center '>
                            <div style={{width:"90%"}} className='m-0 p-0 ms-4'>
                            <TextArea
                     
                            type='text'
                            label="Shipping Address"
                            placeholder="enter your address"
                            var={user.address}
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
                          {/* <div className=' mt-4 d-flex align-items-center justify-content-center'>
                            <button onClick={showCreditCard} className='btn btn-primary' style={{width:"70%" ,fontWeight:"bolder"}}>Pay by Credit Card</button>
                        </div>
                        <div className="horizontal-line">
                        <div className="line"></div>
                        <div className="text fs-4">or</div>
                        <div className="line"></div>
                        </div>
                        <div className=' mb-4 d-flex align-items-center justify-content-center'>
                            <button style={{width:"70%",color:"blue",fontSize:"large",fontWeight:"bolder",fontStyle:'italic'}} className='btn btn-warning'> Pay <span style={{color:"rgb(42, 119, 192)"}}>Pal</span></button>
                        </div> */}
                        <div className='d-flex flex-column align-items-center justify-content-center pay' >
                        <div id="paypal-button-container"></div>
                        </div>
        
        
                    </div>
                </div>
            </div>



            {/* pay by credit Card  */}

            <div className='container-fluid mt-4' id='creditcard' >
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
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" grey"}}>1 Item</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:" grey"}}>{buy.price}$</h4>
                           </div>

                           <div className='mt-4 d-flex  align-items-center justify-content-between credit-cart' >
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" grey"}}>Shipping</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:" grey"}}>{shipping}$</h4>
                           </div>

                           <div className='mt-4 d-flex  align-items-center justify-content-between credit-cart' >
                           <h4 className='ms-4' style={{fontWeight:"bold" ,color:" black"}}>Total</h4>
                           <h4  className="me-4" style={{fontWeight:"bold" ,color:"blueviolet"}}>{parseFloat(buy.price)+parseFloat(shipping)}$</h4>
                           </div>

                           <div className='line-under' style={{borderBottom:"2px" ,borderBottomStyle:'solid',borderBottomColor:"silver"}}></div>
               
                           <p className='text-secondary mt-3'>
                            by i clicking pay .i agree to zit-shop <br/>
                            zit-shop<Link to={"/user_argement"}> user Argement</Link>
                           </p>
                           <button className='btn btn-primary mt-4 fs-4 ' style={{width:'33%',fontWeight:"bold"}}>Pay ${parseFloat(buy.price)+parseFloat(shipping)}</button>
               
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

            </>
          )
    }else{

        return(
            <div className='mt-4 d-flex align-items-center justify-content-center'>
                {
                    Object.keys(buy).length>0?(
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

export default Buy
