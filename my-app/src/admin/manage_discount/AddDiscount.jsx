import React, { useState } from 'react'
import Input from '../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { axiosClient } from '../../api/axios';
import {  Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardSide from '../../components/DashboardSide';



const AddDiscount = () => {
    const [Code ,SetCode]=useState("")
    const [Percentage ,setPercentage]=useState()
    const [Errors ,SetErrors]=useState({})
    const [loading,setLoading]=useState(false);
 

    const handleAddCategory =async(e)=>{
        e.preventDefault();

        const Data={
            code:Code,
            percentage :Percentage,
        }

        console.log(Data)

        try {
            setLoading(true)
            const response=await axiosClient.post("api/discount" ,Data);
            if(response.status ==="failed"){
                console.error("adding failed",response.data.message)
                toast.error('Failed to create Discount');
            }else{
                console.log('added successful:', response.data);
                toast.success('Discount created successfully');
                SetCode("")
                setPercentage('')

                SetErrors({})
            }
        } catch (error) {
            if (error.response) {

                console.error('Response Error:', error.response.data);
                console.log(error.response.data.errors)
                SetErrors(error.response.data.errors)
                toast.error('Failed to create Discount');

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
            <div className='col-lg-10 co-md-10 col-sm-10'>
                <form className='card mx-auto ms-4 mt-4 p-3' onSubmit={(e)=>{handleAddCategory(e)}}>
                    <h3 className='text-center text-secondary' style={{fontWeight:"bold"}}>  <FontAwesomeIcon className='text-primary' icon={faPlus} /> Add Discount</h3>
                    <hr/>
                    <Input label=" Code "
                    required={true}
                    placeholder="entre discount code"
                    type="text"
                    setVar={SetCode}
                    var={Code}
                    error={Errors.code?true:false}
                    />
                    <small style={{textAlign:"center",fontSize:"15px" ,color:"red",fontWeight:"bold"}}>{Errors.code}</small>

                    <div className='mt-4 d-flex align-items-center justify-content-between' style={{width:'92%'}}>
                        <label style={{fontSize:"19px ",fontWeight:"bold"}}>Percentage<span className=' fs-4 ' style={{color:"red"}}>*</span>:</label>
                        <div className="styled-select " style={{width:"66%"}}>
                        <select onChange={(e)=>{setPercentage(e.target.value)}} value={Percentage} className='w-100 text-center p-2' style={{border:"3px",borderStyle:"solid" ,borderColor:Errors.percentage?"red":"#78b5df" ,fontSize:"16px" ,fontWeight:"bold"} }>
                            <option value={''} >Select percentage</option>
                            <option value={10}>10 %</option>
                            <option value={20}>20 %</option>
                            <option value={30}>30 %</option>
                            <option value={40}>40 %</option>
                            <option value={50}>50 %</option>
                            <option value={60}>60 %</option>
                            <option value={70}>70 %</option>
                            <option value={80}>80 %</option>
                            <option value={90}>90 %</option>
                        </select>
                     </div>
                    </div>
                    <small style={{textAlign:"center" ,color:"red",fontWeight:"bold"}}>{Errors.percentage}</small>




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

export default AddDiscount
