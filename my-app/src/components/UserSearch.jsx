import React, {useState, useEffect } from 'react'
import { axiosClient } from '../api/axios'

const UserSearch = (props) => {
    const [products ,setProducts]=useState([])
    const [term ,setTerm]=useState("")
    const [Searchloading,setSearchLoading]=useState(false)

    useEffect(()=>{
        fetchItems()
      },[])
    
    useEffect(() => {
    
    if(term){
      const filteredResults = products.filter(item =>
        item.id==term ||
        item.email.toLowerCase().includes(term.toLowerCase()) ||
        item.first_name.toLowerCase().includes(term.toLowerCase()) ||
        item.last_name.toLowerCase().includes(term.toLowerCase()) 
        );
        console.log(filteredResults,"eee")
        console.log(term)
        if(filteredResults.length>0){
          props.setVar(filteredResults);
        }else{
          props.setVar([404, term])
        }
        
    }else{
      props.setVar([])
    }
    }, [term,products]);
    
    
  
    
    const fetchItems=async()=>{
      setSearchLoading(true)
      const response = await axiosClient.get(props.api);
      setProducts(response.data.product)
      console.log(response.data.product)
      setSearchLoading(false)
    }
    
    

  return (
    <div className='d-inline-block ms-4 ps-4 me-4 ' style={{width:"70%"}}>
      <input className='custom-input w-100 rounded-4 ' placeholder={props.placeholder} type='text' onChange={(e)=>{setTerm(e.target.value)}} />
    </div>
  )
}

export default UserSearch