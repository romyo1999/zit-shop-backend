import React, { useState } from 'react'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { axiosClient } from '../../api/axios';
import {  Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardSide from '../../components/DashboardSide';



const AddCategory = () => {
    const [category ,setCategory]=useState("")
    const [body ,setBody]=useState("")
    const [Errors ,SetErrors]=useState({})
    const [loading,setLoading]=useState(false);
    const [Size,setSize]=useState("")
    
    const Data={
        name:category,
        feature:body,
        size:Size
    }

    const handleAddCategory =async(e)=>{
        e.preventDefault();

        const Data={
            name:category,
            feature:body,
            size:Size
        }

        console.log(Data)

        try {
            setLoading(true)
            const response=await axiosClient.post("api/category/create" ,Data);
            if(response.status ==="failed"){
                console.error("adding failed",response.data.message)
                toast.error('Failed to create category');
            }else{
                console.log('added successful:', response.data);
                toast.success('Category created successfully');
                setBody("")
                setCategory("")
                setSize("")
                SetErrors({})
            }
        } catch (error) {
            if (error.response) {

                console.error('Response Error:', error.response.data);
                SetErrors(error.response.data.error)
                toast.error('Failed to create category');

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
    console.log(Size)
  return (
    <>

    <div className='container-fluid' style={{background:"#f0f0f0"}}>
        <div className='row'>
           <DashboardSide/>
            <div className='col-lg-10 co-md-10 col-sm-10'>
                <form className='card mx-auto ms-4 mt-4 p-3' onSubmit={(e)=>{handleAddCategory(e)}}>
                    <h3 className='text-center text-secondary' style={{fontWeight:"bold"}}>  <FontAwesomeIcon className='text-primary' icon={faPlus} /> Add Category</h3>
                    <hr/>
                    <Input label=" Category Name "
                    required={true}
                    placeholder="entre category name"
                    type="text"
                    setVar={setCategory}
                    var={category}
                    error={Errors.name?true:false}
                    />
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.name}</small>

                    <TextArea label=" Category feature "
                    required={true}
                    placeholder="entre category feature"
                    type="text"
                    setVar={setBody}
                    var={body}
                    error={Errors.feature?true:false}

                    />
                    <small style={{textAlign:"center" ,color:"red",fontWeight:"bold"}}>{Errors.feature}</small>

                    <div className='mt-4 d-flex align-items-center justify-content-between' style={{width:'92%'}}>
                        <label style={{fontSize:"19px ",fontWeight:"bold"}}>Size<span className=' fs-4 ' style={{color:"red"}}>*</span>:</label>
                        <div className="styled-select " style={{width:"66%"}}>
                        <select onChange={(e)=>{setSize(e.target.value)}} value={Size} className='w-100 text-center p-2' style={{border:"3px",borderStyle:"solid" ,borderColor:Errors.size?"red":"#78b5df" ,fontSize:"16px" ,fontWeight:"bold"} }>
                            <option value={""}>Select size</option>
                            <option value={"XC,S,M,L,XL,XXL,XXXL"}>XC-S-M-L-XL-XXL-XXXL</option>
                            <option value={"1T,2T,3T,4"}>1T-2T-3T-4T</option>
                            <option value={"small,medium,large"}>small-medium-large</option>
                        </select>
                     </div>
                    </div>
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.size}</small>


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

export default AddCategory
