import React, { useState,useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../spinners/Spinner';
import { axiosClient2 } from '../api/axios2';
import { useFavoritContext } from '../providers/FavoritProvider';


library.add(faHeart);

const ItemCard = (props,refreshPage) => {
    const [imageLoading ,setImageLoading]=useState(true)
    const [products ,setProducts]=useState(props.data)
    const [active ,setActive]=useState()
    const {Data,count ,setCount}=useFavoritContext()
    
    let objectLength = Object.keys(Data).length;

useEffect(()=>{
 handleChangeColor()
},[Data])


const handleChangeColor=()=>{
  for (var  i=0 ;i < objectLength ;i++){
    if(Data[i].product_id==products.id){
      setActive(true)
      break;
    }
}
}

const promo=parseFloat(products.price)+ parseFloat(products.price)*20/100

const handleImageLoad = () => {
        setImageLoading(false);
      };


const handleToggleWishlist = async() => {
      try {
        const response= await axiosClient2.post(`api/favorites/${products.id}`)
        if(response.status===201){
          handleChangeColor()
          setActive(true)
          setCount(count+1)
        }else if(200){
          setActive(false)
          if(props.refresh===true){
            handleChangeColor()
            props.setreload(props.reload+1)
            setCount(count+1)
          }
        }
      } catch (error) {
        if(error.response){
          toast.warning("Login First")
        }
      }
    };
  return (
   <>

        <div className='col-lg-3 col-md-4 col-sm-6 mt-3 ms-0 me-0' id='item'> 
        <ToastContainer/>
        <div className="product  "  id='item'  >
            <Link className='w-100' style={{overflow:"hidden" ,width:"100%",display:"block"}}  to={`/show/${products.id}`}>

            {imageLoading && (
                <div className="mb-4 d-flex align-items-center justify-content-center "style={{width:"100%" ,height:"260px" ,background:"rgba(172, 173, 173, 0.8)"}}>
                <div >
                   <Spinner/>
                </div>
                
                </div>
            )}

             <img src={`http://127.0.0.1:8000/storage/${products.image1}`}
             alt={products.title}
              className='img-fluid zoom-img w-100'

              style={{ display: imageLoading ? 'none' : 'block' ,background:"  #8a8d8a" ,width:"100%" ,height:"280px",objectFit:"fill"}}
              onLoad={handleImageLoad}
              />


            </Link>
          <h3 style={{height:"32px" ,overflow:"hidden"}}>{products.title}</h3>
          <p ><span style={{color:"red" ,textDecoration:"line-through" ,fontSize:'14px' ,display:"inline-block" ,marginRight:"5px"}}>${promo}</span> <span style={{fontWeight:"bold" ,color:" #1a3c99"}}>${products.price}</span></p>
          <FontAwesomeIcon
            icon={faHeart}
            className={` wishlist-icon ${active ? 'active' : ''}`}
            onClick={() => handleToggleWishlist()}
          />
        </div>
        </div>
    

    
   </>
  )
}

export default ItemCard
