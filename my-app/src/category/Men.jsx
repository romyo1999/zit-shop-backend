import React,{useState,useEffect} from 'react'
import CategoryCard from '../components/CategoryCard'
import tshirt from "../assets/category/tshirt_man_category.svg"
import hoodie from "../assets/category/hoodiecategory.svg"
import hat from "../assets/category/hat_category.svg"
import buckethast from "../assets/category/bucket_hat_category.svg"
import { axiosClient } from '../api/axios'
import ItemCard from '../components/ItemCard'
import { Spinner } from 'react-bootstrap'
const Men = () => {
  const [products ,setProducts]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchProducts()
  },[])


const fetchProducts=async()=>{
  setLoading(true)
  const response = await axiosClient.get("api/products/group/man");
  setProducts(response.data.products)
  console.log(response.data.products)
  setLoading(false)
}


  return (
    <>
        <div className='container'>
          <div className='row '>
          <div className="horizontal-line">
          <div className="line"></div>
          <div className="text fs-4">Our Products</div>
          <div className="line"></div>
        </div>
        <div className='col-lg-2'></div>
        <CategoryCard grid={2} name="T-shirts" image={tshirt}  route="/man_tshirt" />
        <CategoryCard grid={2} name="Hoodies" image={hoodie}  route="/man_hoodie" />
        <CategoryCard grid={2} name="Hats" image={hat}  route="/man_hat" />
        <CategoryCard grid={2} name="Bucket Hats" image={buckethast}  route="/man_bucket_hat" />
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
    
    </>
  )
}

export default Men
