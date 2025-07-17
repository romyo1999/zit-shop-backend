import React, { useState,useEffect } from 'react'
import CategoryCard from '../components/CategoryCard'
import women from "../assets/category/womencategory.svg"
import kids from "../assets/category/kids_dresse.svg"
import { axiosClient } from '../api/axios'
import ItemCard from '../components/ItemCard'
import { Spinner } from 'react-bootstrap'
const Dresses = () => {

  const [products ,setProducts]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchProducts()
  },[])


const fetchProducts=async()=>{
  setLoading(true)
  const response = await axiosClient.get("api/products/category/dresses/3");
  setProducts(response.data.products)
  console.log(response.data.products)
  setLoading(false)
}
  return (
    <div className='container'>
    <div className='row'>
    <div className="horizontal-line">
    <div className="line"></div>
    <div className="text fs-4">Our Range</div>
    <div className="line"></div>
    </div>
    <div className='col-lg-3 col-md-4 col-sm-4'></div>
  <CategoryCard grid={2} name="Woman" image={women}  route="/woman_dresse" />
  <CategoryCard grid={2} name="Kids" image={kids}  route="/kids_dresse" />

</div>
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

export default Dresses
