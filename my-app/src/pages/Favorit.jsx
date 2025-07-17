import React, { useState,useEffect,useContext } from 'react'
import { axiosClient } from '../api/axios'
import ItemCard from '../components/ItemCard'
import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Favorit = () => {
    const [products ,setProducts]=useState([])
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState("")
  const [reload,setreload]=useState(0)
  const [isLoagin,setIsLogin]=useState(true)

  useEffect(() => {

    if(products.length<1){
      const timeoutId = setTimeout(() => {
        setMessage('Sorry this pgae empty');

      }, 10000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [reload]);



  useEffect(()=>{
    fetchProducts()
  },[reload])


const fetchProducts=async()=>{
  setLoading(true)
try {
  const response = await axiosClient.get("api/favorites/show");
  setProducts(response.data.favorites)
  console.log(response.data)
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


if(isLoagin){

  return (
    <div className='container'>

    <br/>
    <div className="horizontal-line">
      <div className="line"></div>
      <div className="text fs-4">Items</div>
      <div className="line"></div>
    </div>

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
          
          <div className='row'>
          {products.map((product) => (
            <ItemCard key={product.product.id} data={product.product}  refresh={true} reload={reload} setreload={setreload} />
          ))}
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

export default Favorit
