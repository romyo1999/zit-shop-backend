import React, {useState, useEffect } from 'react'
import CategoryCard from '../components/CategoryCard'
import hoodie from "../assets/category/hoodiecategory.svg"
import hat from "../assets/category/hat_category.svg"
import buckethast from "../assets/category/bucket_hat_category.svg"
import tshirt from "../assets/category/tshirt_women_category.svg"
import dresse from "../assets/category/dressecategory.svg"
import { axiosClient } from '../api/axios'
import ItemCard from '../components/ItemCard'
import { Spinner } from 'react-bootstrap'

const Women = () => {
  const [products ,setProducts]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchProducts()
  },[])


const fetchProducts=async()=>{
  setLoading(true)
  const response = await axiosClient.get("api/products/group/woman");
  setProducts(response.data.products)
  console.log(response.data.products)
  setLoading(false)
}



  return (
      <div className='container'>
          <div className='row'>
          <div className="horizontal-line">
          <div className="line"></div>
          <div className="text fs-4">Our Products</div>
          <div className="line"></div>
          </div>
        <CategoryCard grid={2} name="T-shirts" image={tshirt}  route="/woman_tshirt" />
        <CategoryCard grid={2} name="Hoodies" image={hoodie}  route="/woman_hoodie" />
        <CategoryCard grid={2} name="Hats" image={hat}  route="/woman_hat" />
        <CategoryCard grid={2} name="Bucket Hats" image={buckethast}  route="/woman_bucket_hat" />
        <CategoryCard grid={2} name="Dreeses" image={dresse}  route="/woman_dresse" />
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

export default Women
