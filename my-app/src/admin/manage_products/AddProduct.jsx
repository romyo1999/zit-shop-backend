import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { axiosClient } from '../../api/axios';
import {  Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashboardSide from '../../components/DashboardSide';




const AddProduct = () => {
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

    const navigate=useNavigate()





    // display the categories options  

    useEffect(()=>{
        axiosClient.get(`api/categories_list`)
        .then((response)=>{
            if(response.data.status===404){
                console.log(response.data)
            }else{
                setOptions(response.data.categories)
                SetCategory(response.data.categories[0].id)

            }
        })

    },[])


    




    const handleAddProduct =async(e)=>{
        e.preventDefault();

        const Data={
            title:Title,
            description:Description,
            price:Price,
            group:Group,
            category_id:Category,
            image1:Image1,
            image2:Image2
        }

                
        try {

            setLoading(true)
            const response=await axiosClient.post('api/product/create' ,Data);
            if(response.status ==="failed"){
                console.error("updating failed",response.data.message)
                toast.error('Failed to createc a product');
            }else{
                console.log('create successful:', response.data);
                SetErrors({})
                setTitle('');
                SetDescription('');
                SetPrice('');
                SetGroup('man'); 
                SetCategory(options[0]?.id); 
                SetImage1(null);
                SetImage2(null);

                toast.success('product creating successfully');

            }
        } catch (error) {
            if (error.response) {

                console.error('Response Error:', error.response.data);
                SetErrors(error.response.data.errors)
                toast.error('Failed to createc a product');

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

    return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
        <div className='row'>
            <DashboardSide/>
            <div className='col-lg-10 col-md-10 col-sm-10'>
                <form  method="post" action="/api/product/create" encType="multipart/form-data"  className='card mx-auto ms-4 mt-4 p-3' onSubmit={(e)=>{handleAddProduct(e)}}>
                    <h3 className='text-center text-secondary' style={{fontWeight:"bold"}}>  <FontAwesomeIcon className='text-primary' icon={faPlus} /> Add Product</h3>
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
                        <select onChange={(e)=>{SetGroup(e.target.value)}} className='w-100 text-center p-2' style={{border:"3px",borderStyle:"solid" ,borderColor:Errors.group?"red":"#78b5df" ,fontSize:"16px" ,fontWeight:"bold"} }>
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
                        <select  onChange={(e)=>{SetCategory(e.target.value)}} className='w-100 text-center p-2' style={{border:"3px",borderStyle:"solid" ,borderColor:Errors.category_id?"red":"#78b5df",fontSize:"16px" ,fontWeight:"bold"} }>
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
                         <div>
                         <div className='mb-1'>
                            <input type='file'   name="image1"  onChange={(e)=>{SetImage1(e.target.files[0])}} />
                            <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.image1}</small>

                           </div>
                           <div className=''>
                            <input type='file' name="image1"    onChange={(e)=>{SetImage2(e.target.files[0])}}/>
                            <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.image2}</small>
                           </div>
                         </div>
                     </div>
                    </div>

















                    <button type='submit'  className='btn btn-primary p-1  w-100 text-white mt-4 fs-4' style={{borderRadius:"15px",fontWeight:"bold"}}  >
                        {loading?(
                            <Spinner/>
                        )
                        :(
                            "ADD"
                        )}
                        
                    </button>


                </form>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
        
    </div>

    </>
  )
   
  
}

export default AddProduct
