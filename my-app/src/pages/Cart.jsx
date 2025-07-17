import React, { useState,useEffect,useContext } from 'react'
import { axiosClient } from '../api/axios'
import ItemCard from '../components/ItemCard'
import { Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift, faGifts, faMinus, faPercent, faPlus, faPlusMinus, faRemove } from '@fortawesome/free-solid-svg-icons'
import ImageLoading from '../components/Image'
import { axiosClient2 } from '../api/axios2'
import { ToastContainer, toast } from 'react-toastify'
import { useCartContext } from '../providers/CartProvider'


const Cart = () => {
    const [products ,setProducts]=useState([])
    const [product ,setProduct]=useState([])
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState("")
  const [reload,setreload]=useState(0)
  const [isLoagin,setIsLogin]=useState(true)
  const [shipping,setShipping]=useState(9)
  const [Subtotal,setSubTotal]=useState(0);
  const [Code,setCode]=useState('');
  const [CodeError,setCodeError]=useState('');
  const [discLoading,setDiscLoading]=useState(false)
  const [discountDesable,setDiscountDesable]=useState(false)
  const {count,setCount,setCheckout}=useCartContext()
  const [gift,setGift]=useState(false);
  const [items,setItems]=useState(false);
  const [discount,setDiscount]=useState(0);
  const [Ides,setIdes]=useState([]);
  const navigate=useNavigate();





  useEffect(() => {

    if(products.length<1){
      const timeoutId = setTimeout(() => {
        setMessage('Sorry this pgae empty');

      }, 10000);
  
      return () => clearTimeout(timeoutId);
    }else{
      setMessage("")
    }
  }, [reload]);



  useEffect(()=>{
    fetchProducts()
  },[reload])


  useEffect(()=>{
    var s=0;
    var q=0;
    var i=[];
    products.map((e)=>{
        s+=((e.product.price*e.quantity))
        q+=(e.quantity)
        i.push(e.product.id)
    })
    setItems(q)
    setSubTotal(s)
    setIdes(i)

  },[products])

const fetchProducts=async()=>{
  setLoading(true)
try {
  const response = await axiosClient.get("api/cart");
  setProducts(response.data.products)
  setMessage("")
  setIsLogin(true)
} catch (error) {
    if(error.response){
      console.error("Response Error",error.response.data)
      setIsLogin(false)
      console.error("Status Error",error.response.status)
      console.error("Headers",error.response.headers)
    }else if(error.request){
        console.error("Request Error" ,error.request)
    }else{
        console.error("general Error" ,error.message)
}

}
setLoading(false)
}




const addQuantity=async(id,qn)=>{
  const QUANTITY={
    quantity:qn+1
  }
  // console.log(QUANTITY)
  console.log(id)
  const response= await axiosClient2.post(`api/cart/add/${id}`,QUANTITY);
  setreload(reload+1)
  setCount(count+1);
  console.log(response)

};

const deleteQuantity=async(id,qn)=>{
  const QUANTITY={
    quantity:qn-1
  }
  const response= await axiosClient2.post(`api/cart/delete/${id}`,QUANTITY);
  fetchProducts()
  setCount(count+1);
  console.log(response)
};

const deleteItem=async(id)=>{
  const response=await  axiosClient2.delete(`/api/cart/${id}`);
  fetchProducts()
  console.log(response);
  setCount(count+1);
}


const handleDiscount=async()=>{
  setDiscLoading(true)
  if(Code){
    const Id=Code.replace(' ',"");
    console.log(Id)
  
    const res =await axiosClient2.get(`/api/discount/${Id}`)
    console.log(res)
    if(res.status===200){
      setDiscountDesable(true)
      // setSubTotal(Subtotal-Subtotal*parseInt(res.data.discount[0].percentage)/100)
      setDiscount(res.data.discount[0].percentage)
      
      setCode("")
      setCodeError("")
      toast.success(`Discount -${res.data.discount[0].percentage}%`)
    }else{
      setCodeError("Code error!!")
      toast.error("Code Dosent exists")
    }
    setDiscLoading(false)
  }else{
    setCodeError(" empty !!")
    setDiscLoading(false)

  }
  
}





const handleCheckout=()=>{

  const CheckOut={
    "ides":Ides,
    "gift":gift,
    "count":items,
    "subTootal":Subtotal,
    "shipping":shipping,
    "discount":discount,
    "tootal":(parseFloat(Subtotal)+parseFloat(shipping)) - (parseFloat(Subtotal)+parseFloat(shipping))*discount/100
  }
  setCheckout(CheckOut)
  console.log(CheckOut)
  navigate("/checkout")
  
}






if(isLoagin){

  return (
    <div className='container-fluid'>



{
        loading?(
              message?(
                <div className='d-flex align-items-center justify-content-center' style={{fontSize:"20px" ,fontWeight:"bold" ,marginTop:"100px"}}>    
                  <div>{message}</div>
              </div>
              ):(
                <div className='d-flex align-items-center justify-content-center' style={{fontSize:"20px" ,fontWeight:"bold" ,marginTop:"100px"}}>    
                <Spinner />
              </div>
              )
        ):(


    
        products.length>0?(










          
          <div className='row mt-4'>
            <ToastContainer/>
            <h4 className='col-lg-12   text-secondary ms-4 '>Shopping Cart :<span className='text-dark fs-6' style={{fontWeight:"bold" ,fontSize:"23px"}}> {items} Items</span></h4>
          <div className='col-lg-9 col-md-12 col-sm-12 mb-4'>
          <div className='row ' >
            {
                
                products.map((e)=>(

                       <>
                       <hr/>
                        <div className='col-lg-2 col-md-2 col-sm-2 h-100 ' >
                        <ImageLoading
                              path={`http://127.0.0.1:8000/storage/${e.product.image1}`}
                              alt={e.title}
                              w={120}
                              h={120}
                              />

                        </div>
                        <div className='col-lg-4 col-md-3 col-sm-3 d-flex flex-column align-items-center justify-content-center ' >
                            <h5  className='  text-canter' style={{fontWeight:'bold' ,fontFamily:"sans-serif",wordBreak:'break-word',overflowY:'hidden'}}>{e.product.title}</h5>
                            <p className='text-secondary    text-center mb-2 w-100  mb-4 ' style={{maxHeight:"80px",wordBreak:'break-word',overflowY:'hidden'}}>{e.product.description}</p>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-1  d-flex flex-column align-items-center justify-content-center '>
                            <span style={{fontFamily:"inherit"}} >size </span> 
                            <span  style={{fontWeight:"bold"}}>{e.size}</span>
                        </div>

                        <div className='col-lg-4 col-md-5 col-sm-6 d-flex align-items-center justify-content-between ' >
                            <button className='btn  rounded-circel btn-primary btn-hover' disabled={(e.id,e.quantity) > 1 ?false:true} onClick={()=>deleteQuantity(e.id,e.quantity)} ><FontAwesomeIcon icon={faMinus}/></button>
                            <div className='ps-3 pe-3 pt-2 pb-2 text-center ' style={{fontWeight:"bold",width:'fit-content',height:"fit-content",border:"1px",borderStyle:"solid" ,borderColor:"#2980b9",borderRadius:"50%"}}>{e.quantity}</div>
                            <button className='btn  rounded-circel btn-primary btn-hover'  onClick={()=>addQuantity(e.id,e.quantity)} ><FontAwesomeIcon icon={faPlus}/></button>
                            <div className='text-success' style={{fontWeight:"bold"}} >$ {e.product.price*e.quantity}</div>
                            <button className='btn  rounded-circel btn-hover' onClick={()=>deleteItem(e.id)}><FontAwesomeIcon icon={faRemove}/></button>

                        </div>
                       </>


                    
                    
                ))
                
            }

                    </div>


          </div>
          <div className='col-lg-3 col-md-8 col-sm-12 mx-auto mb-4 '  >
            <div className='w-100 d-flex flex-column align-items-center justify-content-center p-1' style={{border:"2px",borderStyle:'solid',borderColor:'silver',borderRadius:"20px",boxShadow:"0 0 5px rgb(98, 188, 240)"}}>
            <form className='mb-3'>
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
            
            <label htmlFor='gift' className='p-2 d-flex align-items-center justify-content-center m-3' style={{border:"2px",borderStyle:"solid",borderColor:"rgb(44, 90, 105)",borderRadius:"10px"}}>
                <input  type='checkbox' value={true} id='gift' name='gift' onChange={(e)=>{setGift(e.target.value)}} className='me-4'/>
                <label style={{fontWeight:'bold',fontSize:"16px",fontFamily:"inherit"}} htmlFor='gift' className=''>this order is a gift </label>
                <FontAwesomeIcon className='ms-3' icon={faGift}/>
            </label>
                <div htmlFor='gift' className=' d-flex flex-row justify-content-between m-3' >
                    <div className='w-100'>
                <input value={Code}  type='text' placeholder='Enter Discount Code' id='gift' name='gift' onChange={(e)=>{setCode(e.target.value)}} className='me-4' style={{border:"2px",borderStyle:"solid",borderColor:CodeError?"red":"rgb(159, 37, 163)",borderRadius:"10px",width:"100%",padding:'3px'}}/>
                <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold",width:'100%'}}>{CodeError}</small>
                </div>
                <button disabled={discountDesable} style={{fontWeight:"bold",background:"rgb(159, 37, 163)",borderRadius:"10px",width:"60px"}} onClick={handleDiscount}  className=' text-white h-50 p-1'> 
                {
                  discLoading?(
                    <Spinner style={{width:"20px",height:"20px"}}/>
                  ):(
                    'Apply'
                  )
                }
                </button>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-between mt-3 w-100 ps-2'>
                <div className='w-100 fs-4' style={{fontFamily:"revert",fontWeight:"bold" }}>
                SubTotal =<span style={{color:"rgb(19, 60, 105)"}}> $ {Subtotal}</span>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-between mt-3 w-100 ps-2'>
                <div className='w-100 fs-4' style={{fontFamily:"revert",fontWeight:"bold" }}>
                Shipping =<span style={{color:"rgb(19, 60, 105)"}}> $ {shipping}</span>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-between mt-3 w-100 ps-2'>
                <div className='w-100 fs-4' style={{fontFamily:"revert",fontWeight:"bold" }}>
                Total =<span style={{color:"rgb(19, 60, 105)"}}> $ {  (parseFloat(Subtotal)+parseFloat(shipping)) - (parseFloat(Subtotal)+parseFloat(shipping))*discount/100   }</span>
                </div>
            </div>

            <div className='w-100 d-flex mb-1 flex-column align-items-center justify-content-between mt-3 w-100 '>
                <button onClick={handleCheckout} style={{fontWeight:"bold" }} className='btn btn-primary btn-rounded ps-4 pe-4 text-white fs-4 w-100'>Checkout</button>
            </div>


            </div>

          </div>
          </div>









        ):(
          <div className='d-flex align-items-center justify-content-center' style={{fontSize:"20px" ,fontWeight:"bold" ,marginTop:"100px"}}>    
          <div>yuo have no favorit items</div>
      </div>
        )
 

        )
      }
</div>


  )


  

}else{

  return (
    <div className='container'>
          <br/>
    <div className="horizontal-line">
      <div className="line"></div>
      <div className="text fs-4">Items</div>
      <div className="line"></div>
    </div>
      <div className='w-50 mx-auto mt-4'>
      <h3 className='text-center'>Please Sign in  First </h3>
      <div className='d-flex align-items-center justify-content-center mt-4'>
      <Link className='text-white text-decoration-none  btn btn-info d-inline-block me-4' to="/registre">Registre</Link>
      <Link className=' text-decoration-none btn btn-primary ps-4 pe-4' to="/login">Login</Link>
      </div>
      </div>
    </div>
  )
}

 
}

export default Cart
