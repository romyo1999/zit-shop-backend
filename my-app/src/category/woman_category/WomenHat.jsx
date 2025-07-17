import React, { useState,useEffect } from 'react'
import ItemCard from '../../components/ItemCard'
import { Spinner } from 'react-bootstrap'
import { axiosClient } from '../../api/axios'

const WomenHat = () => {
  const [products ,setProducts]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchProducts()
  },[])


const fetchProducts=async()=>{
  setLoading(true)
  const response = await axiosClient.get("api/products/group/woman/category/hats/id/4");
  console.log(response.data.products)
  setProducts(response.data.products)
  console.log(response.data.products)
  setLoading(false)
}
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
      <div className='d-flex align-items-center justify-content-center' style={{fontSize:"20px" ,fontWeight:"bold" ,marginTop:"100px"}}>
        
        <Spinner />
 
      </div>
    ):(


  <div className='row'>
  {products.map((product) => (
    <ItemCard key={product.id} data={product} />
  ))}
  </div>

    )
  }
</div>
  )
}

export default WomenHat
