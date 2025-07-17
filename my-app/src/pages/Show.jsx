import React, { useState,useEffect } from 'react'
import { axiosClient } from '../api/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosClient2 } from '../api/axios2';
import { useCartContext } from '../providers/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faArrowCircleLeft, faCartArrowDown, faCreditCard, faStar } from '@fortawesome/free-solid-svg-icons';
import ImageLoading from '../components/Image';
import { Spinner } from 'react-bootstrap';
import { toast ,ToastContainer} from 'react-toastify';
const Show = () => {
    const [product ,setproduct]=useState([]);
    const [sizes,setSizes]=useState()
    const [feature,setFeature]=useState()
    const [sizeSelected,setSizeselected]=useState()
    const [image,setImage]=useState("")
    const [Error ,SetError]=useState('')
    const {count ,setCount}=useCartContext()
    const [loading ,setLoading]=useState(false)
    const  {setBuy}=useCartContext()
    const navigate=useNavigate()
    const {id}=useParams()
    useEffect(()=>{
        fetchShow()
    },[])




        const addToCart= async()=>{
          console.log(Error)
          if(sizeSelected){
        setLoading(true)
        const SIZE={
            size:sizeSelected
        }
        const res=await axiosClient2.post(`api/cart/${id}`,SIZE)
        setCount(count+1)
        console.log(res);
        setLoading(false)
        SetError("")
        toast.success("New Item Added to cart")
          }else{
            SetError("select Size")
          }
          
    }

    const fetchShow =async()=>{
        console.log(id)
        if (id){
             const response=await axiosClient.get(`/api/products/show/${id}`);
             setproduct(response.data.product[0])
             console.log(response.data.product[0])
             setImage(response.data.product[0].image1)
             setSizes((response.data.product[0].category.size).split(','))
             setFeature((response.data.product[0].category.feature).split("."))
             console.log(sizes.length)
             console.log(response.data.product[0])

        }
       
    }

    const BuyNow=()=>{
      if(sizeSelected){
        const Buy={
          "price":product.price,
          "size":sizeSelected,
          "id":product.id
        }
        setBuy(Buy);
        console.log(Buy)
        navigate('/buy')
        

      }else{
        SetError("select Size")
      }


    }




  return (
    <div className='container-fluid' >
      <ToastContainer position='bottom-right'/>
      <div className='row'>
    {/* image and buttons  */}
      <div className='col-lg-5 col-md-6  col-sm-12 d-flex flex-column align-items-center justify-content-center mt-4'>
        <div className='w-100 d-flex flex-row align-items-center justify-content-center '>
          <button onClick={()=>setImage(product.image1)}  style={{width:"50px" ,height:"50px",color:"white",background:"#2980b9"}} className='btn-hover p-3 d-flex align-items-center justify-content-center me-2'> <FontAwesomeIcon className='fs-4' icon={faArrowAltCircleLeft}/> </button>
          <ImageLoading
          path={`http://127.0.0.1:8000/storage/${image}`}
          alt={"image1"}
          w={300}
          h={300}
          />
          <button onClick={()=>setImage(product.image2)}  style={{width:"50px" ,height:"50px",color:"white",background:"#2980b9"}} className='btn-hover p-3 d-flex align-items-center justify-content-center ms-2'> <FontAwesomeIcon className='fs-4' icon={faArrowAltCircleRight}/> </button>
        </div>

      </div>

        {/* title and description and size  */}
      <div className='col-lg-6 col-md-6 col-sm-4  d-flex flex-column align-items-center justify-content-center mt-4 show-media'>
      <h3 className='ms-2 w-100' style={{fontWeight:'bold'}}>{product.title}</h3>
      <h2 className='ms-3 w-100' style={{fontWeight:'bold',color:"#2baf10"}}>{product.price}$+</h2>
      <h5 className='w-100 ms-2 mt-1 text-secondary' >{product.description}</h5>
      <label htmlFor='size' style={{fontWeight:'bold',fontSize:"20px",marginTop:"20px"}}>Select Size <spann className="text-danger fs-4">*</spann>:</label>
      <select id='size' onChange={(e)=>{setSizeselected(e.target.value)}}  className='w-50 text-center p-2 ' style={{border:"3px",borderStyle:"solid" ,borderColor:Error?"red":"#78b5df" ,fontSize:"16px" ,fontWeight:"bold",borderRadius:"30px"} }>
        <option value={""}>select option</option>
        {
        sizes?.map((e)=>(
            <option value={e}>{e}</option>
        ))
        }
    </select>
    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Error}</small>

    <button onClick={BuyNow} className='btn btn-white mb-2 btn-shadow mt-4' > 
        <FontAwesomeIcon icon={faCreditCard} className='me-2'/>
        Buy it Now
    </button>
    <button className='btn btn-dark btn-shadow ' onClick={addToCart} > 
        {
          loading?(
            <Spinner style={{width:"10px" ,height:"10px"}}/>
          ):(
            <>
              <FontAwesomeIcon icon={faCartArrowDown} className='me-2'/>
              Add To Cart
            </>
          )
        }

    </button>
      </div>

      {/* feedback  */}
      <div className=' col-lg-6 col-md-6 col-sm-12 flex-column align-items-center justify-content-center' >
      <div className='w-100 mt-3 d-flex flex-column align-items-center justify-content-center  '>
        <h4 style={{fontWeight:'bold'}}>16 reviews 
        <FontAwesomeIcon className='ms-4' icon={faStar}/>
        <FontAwesomeIcon  icon={faStar}/>
        <FontAwesomeIcon  icon={faStar}/>
        <FontAwesomeIcon  icon={faStar}/>
        </h4>

        <div className='ms-4 w-100 d-flex flex-column align-items-center mt-3 ' style={{borderTop:"2px" ,borderTopStyle:"solid",borderTopColor:"silver"}}>
        <div className='mt-4 w-100 ms-4'>
        <FontAwesomeIcon  icon={faStar}/>
        <FontAwesomeIcon  icon={faStar}/>
        <FontAwesomeIcon  icon={faStar}/>
        <FontAwesomeIcon  icon={faStar}/>
        </div>
        <p className='w-100'>the product quality is good</p>
        <Link className='d-flex flex-row align-items-center justify-content-start w-100 mt-3 text-secondary '>
        <img 
        src={`http://127.0.0.1:8000/storage/${product.image1}`}
        width={50}
        height={50}
        style={{borderRadius:"100%",background:"silver"}}
        />
        <small>alex fred</small>
        </Link>
        </div>

        </div>
      </div>


        {/* product feature  */}
      <div className='col-lg-6 col-md-6 col-sm-12 flex-column align-items-center justify-content-center mt-4'>
      <h4 className='mt-4' style={{fontWeight:'bold'}}>Product Features </h4>

          <div className='mt-3' style={{wordBreak:"break-word"}} >
            <ul>
              { feature?.map((e)=>(
            <li className='mb-3'>{e}</li>
           ))
           
           }
            </ul>
           
          </div>
      </div>

      </div>

    </div>
  )
}

export default Show
