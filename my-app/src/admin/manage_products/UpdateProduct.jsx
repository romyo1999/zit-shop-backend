import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { axiosClient } from '../../api/axios';
import {  Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {axiosClient2} from '../../api/axios2'
import ImageLoading from '../../components/Image';
import DashboardSide from '../../components/DashboardSide';




const UpdateProduct = () => {
    const [options ,setOptions]=useState([])
    const [Title ,setTitle]=useState("")
    const [Description ,SetDescription]=useState("")
    const [Price ,SetPrice]=useState()
    const [Group ,SetGroup]=useState("man")
    const [Category ,SetCategory]=useState()
    const [Image1 ,SetImage1]=useState(null)
    const [Image2 ,SetImage2]=useState(null)
    const [Errors ,SetErrors]=useState({})
    const [loading,setLoading]=useState(false);
    const [exist,setExist]=useState(true)
    const [errorImage1 ,setErrorImage1]=useState([])
    const [errorImage2 ,setErrorImage2]=useState([])

    const navigate=useNavigate()

    const {id}=useParams()

    useEffect(()=>{
        fetchProduct()
    },[]
    )

const fetchProduct=()=>{
    axiosClient.get(`api/products/${id}`).then((response)=>{
        response.data.product?(
            setExist(true),
            // console.log(response.data.product),
            setTitle(response.data.product.title),
            SetDescription(response.data.product.description),
            SetPrice(response.data.product.price),
            SetGroup(response.data.product.group),
            SetCategory(response.data.product.category_id),
            SetImage1(response.data.product.image1),
            SetImage2(response.data.product.image2)
            

        ):(
            setExist(false)
        )
    })
}



    // display the categories options  

    useEffect(()=>{
        axiosClient.get(`api/categories_list`)
        .then((response)=>{
            if(response.data.status===404){
                console.log(response.data)
            }else{
                setOptions(response.data.categories)

            }
        })

    },[])


    




    const handleUpdateProduct =async(e)=>{
        e.preventDefault();

        const data={
            title:Title,
            description:Description,
            price:Price,
            group:Group,
            category_id:Category,
        }
        console.log(data)
                
        try {

            setLoading(true)
            const response=await axiosClient2.patch(`api/product/${id}` ,data);
            if(response.status ==="failed"){
                console.error("updating failed",response.data.message)
                toast.error('Failed to update a product');
            }else{
                console.log('update successful:', response.data);
                navigate("/admin/products/manage")
            }
        } catch (error) {
            if (error.response) {
                console.error('Response Error:', error.response.data);
                SetErrors(error.response.data.errors)
                toast.error('Failed to update a product');

                console.error('Status Code:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
    
                console.error('Request Error:', error.request);
            } else {
    
                console.error('General Error:', error.message);
            }
        }

        setLoading(false)
    }


    const  handleImage1=async(imageFile)=>{
        const Data = new FormData();
            Data.append("image1" ,imageFile)

            try {
                const response =await axiosClient.post(`api/product/image1/${id}`,Data);
                console.log(response);
                fetchProduct()
                setErrorImage1([])
            } catch (error) {
                console.log(error.response.data.errors.image1)
                setErrorImage1(error.response.data.errors.image1)
                console.log(errorImage1)
            }

    }

    const  handleImage2=async(imageFile)=>{
        const Data = new FormData();
            Data.append("image2" ,imageFile)

            try {
                const response =await axiosClient.post(`api/product/image2/${id}`,Data);
                console.log(response);
                fetchProduct()
                setErrorImage2([])
            } catch (error) {
                console.log(error.response.data.errors.image2)
                setErrorImage2(error.response.data.errors.image2)
            }

    }



    if(exist===true){
    return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
        <div className='row'>
            <DashboardSide/>
            <div className='col-lg-10 col-md-10 col-sm-10'>
                <form  method="post" action={`/api/product/${id}`} encType="multipart/form-data"  className='card mx-auto ms-4 mt-4 p-3' onSubmit={(e)=>{handleUpdateProduct(e)}}>
                    <h3 className='text-center text-secondary' style={{fontWeight:"bold"}}>  <FontAwesomeIcon className='text-primary' icon={faEdit} /> Update Product</h3>
                    <hr/>

                    <Input label=" title "
                    required={true}
                    placeholder="entre Product title"
                    type="text"
                    setVar={setTitle}
                    var={Title}
                    error={Errors.title?true:false}
                    />
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.title}</small>

                    <TextArea label="Description "
                    required={true}
                    placeholder="entre product description"
                    type="text"
                    setVar={SetDescription}
                    var={Description}
                    error={Errors.description?true:false}

                    />
                    <small style={{textAlign:"center" ,color:"red",fontWeight:"bold"}}>{Errors.description}</small>

                    <Input label=" Price "
                    required={true}
                    placeholder="entre Product Price"
                    type="number"
                    setVar={SetPrice}
                    var={Price}
                    error={Errors.price?true:false}
                    />
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.price}</small>

                    <div className='mt-4 d-flex align-items-center justify-content-between' style={{width:'92%'}}>
                        <label style={{fontSize:"19px ",fontWeight:"bold"}}>Group<span className=' fs-4 ' style={{color:"red"}}>*</span>:</label>
                        <div className="styled-select " style={{width:"66%"}}>
                        <select onChange={(e)=>{SetGroup(e.target.value)}} value={Group} className='w-100 text-center p-2' style={{border:"3px",borderStyle:"solid" ,borderColor:Errors.group?"red":"#78b5df" ,fontSize:"16px" ,fontWeight:"bold"} }>
                            <option value={"man"}>Man</option>
                            <option value={"woman"}>Woman</option>
                            <option value={"kids"}>kids</option>
                        </select>
                     </div>
                    </div>
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.group}</small>

                    
                    <div className='mt-4 d-flex align-items-center justify-content-between' style={{width:'92%'}}>
                        <label style={{fontSize:"19px ",fontWeight:"bold"}}>Category<span className=' fs-4 ' style={{color:"red"}}>*</span>:</label>
                        <div className="styled-select " style={{width:"66%"}}>
                        <select value={Category} onChange={(e)=>{SetCategory(e.target.value)}} className='w-100 text-center p-2' style={{border:"3px",borderStyle:"solid" ,borderColor:Errors.category_id?"red":"#78b5df",fontSize:"16px" ,fontWeight:"bold"} }>
                           {
                            options?.map((e)=>{
                                return(
                                <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            
                            })
                           }
                        </select>
                     </div>
                    </div>
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.category_id}</small>

                    
                    <div className='mt-4 d-flex  align-items-center justify-content-between' style={{width:'92%'}}>
                        <label style={{fontSize:"19px ",fontWeight:"bold"}}>Images<span className=' fs-4 ' style={{color:"red"}}>*</span>:</label>
                        <div className=" d-flex " style={{width:"66%"}}>
                         <div style={{width:"100%"}}>
                         <div style={{width:"100%" }} className='mb-2 w-100 d-flex align-items-center  ' >
                            <input type='file'   name="image1" style={{color:errorImage1.length > 0?"red":"black",fontWeight:"bold",display:"inline-block" ,marginRight:"10px"}}  onChange={(e)=>{handleImage1((e.target.files[0]))}} />
                            <ImageLoading
                          path={`http://127.0.0.1:8000/storage/${Image1}`}
                          alt={Title}
                          w={60}
                          h={60}
                          />

                           </div>
                           <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{errorImage1}</small>

                           <div style={{width:"100%" }} className='mb-2 w-100 d-flex align-items-center  '>
                            <input type='file' name="image1" style={{color:errorImage2.length > 0?'red':"black",fontWeight:"bold",marginRight:"10px"}}   onChange={(e)=>{handleImage2((e.target.files[0]))}}/>
                            <ImageLoading
                          path={`http://127.0.0.1:8000/storage/${Image2}`}
                          alt={Title}
                          w={60}
                          h={60}
                          />
                           </div>
                           <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{errorImage2}</small>

                         </div>
                     </div>
                    </div>

                    <button type='submit'  className='btn btn-primary p-1  w-100 text-white mt-4 fs-4' style={{borderRadius:"15px",fontWeight:"bold"}}  >
                        {loading?(
                            <Spinner/>
                        )
                        :(
                            "UPDATE"
                        )}
                        
                    </button>


                </form>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
        
    </div>

    </>
  )

    }else{
        return(
            <>
            <div style={{marginTop:"10%"}}>
                <h2 className='text-secondary text-center '>Product Nout Found</h2>
                <Link className='d-block text-center' to={"/products/manage"}>Back to products</Link>
            </div>
            </>

        )
    }


   
  
}

export default UpdateProduct
