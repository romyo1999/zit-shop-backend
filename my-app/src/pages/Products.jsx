import React, {useState, useEffect } from 'react'
import ItemCard from '../components/ItemCard'
import { Spinner } from 'react-bootstrap'
import { axiosClient } from '../api/axios'
import { useParams } from 'react-router-dom'
const Products = () => {

  const [products ,setProducts]=useState([])
  const [filterData ,setFilterData]=useState([])
  
  const [loading,setLoading]=useState(false)

  var {term}=useParams()


  useEffect(()=>{
    fetchProducts()
  },[])

useEffect(() => {

if(term){
  const filteredResults = products.filter(item =>
    item.title.toLowerCase().includes(term.replace(/-/g," ").toLowerCase()) ||
    item.description.toLowerCase().includes(term.replace(/-/g," ").toLowerCase()) ||
    item.group.toLowerCase()==term.replace(/-/g," ").toLowerCase()
    );
    console.log(filteredResults,"eee")
    if(filteredResults.length>0){
      setFilterData(filteredResults);
    }else{
      setFilterData([404, term.replace(/-/g," ")])
    }
    
}else{
  setFilterData([])
}
}, [term,products]);



const fetchProducts=async()=>{
  setLoading(true)
  const response = await axiosClient.get("api/products");
  setProducts(response.data.product)
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
{

filterData.length>0?(

    filterData[0]===404?(
          <div className='text-center mt-4 '>We couldn't find any results for <span style={{fontWeight:'bold'}}>{filterData[1]}</span></div>
    ):(
          filterData.map((product) => (
          <ItemCard key={product.id} data={product} />
    )
  

))
  
):(
  
    products.map((product) => (
      <ItemCard key={product.id} data={product} />
    ))
  
)





}
</div>

  )
}




</div>

  )
}

export default Products
