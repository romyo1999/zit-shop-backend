import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope        } from '@fortawesome/free-solid-svg-icons';
import Footer from './userLayout/footer';
import { axiosClient2 } from '../api/axios2';
import { useUserContext } from '../providers/UserProvider';
const AdminLayout = ({ children }) => {

const {user,countMessage}=useUserContext()
  return (
    <div className='container-fluid'>
      <div className='header d-flex align-items-center justify-content-between pb-2 bg-dark'>
      <div className='text-white custom-hover rounded-4 ms-1  pe-1 pt-1'>
        <Link to={"/profile "} style={{textDecoration:"none" , color:"white"}} className=' dashboard-name-hover '><h2 className=' p-2  mb-0 '>{user.first_name} {user.last_name}</h2></Link>
      </div>

      <div className='text-white fs-3 mt-2 '>
        <Link   className='text-white d-inline-block me-4 rounded-circle  p-2  text-decoration-none custom-hover' to={"/"}><FontAwesomeIcon className=' fs-1 ' icon={faHome}/></Link>
        <Link to="/admin/questions" className='text-white  d-inline-block me-3 ms-2  pe-3 ps-3 pt-1 rounded-4  custom-hover' style={{position:"relative"}} ><FontAwesomeIcon className='fs-1 me-3 mt-2' icon={faEnvelope}/>
        {
          countMessage>0?(
        <span style={{ width:"30px",color:"white",background:"red" ,borderRadius:"50%",display:"inline-block" ,padding:'0 2px' ,textShadow:"30px" ,fontSize:"20px" ,fontWeight:"bolder" ,position:"absolute" ,top:0 ,right:0 ,textAlign:"center"}}>{countMessage}</span> 

          ):(
            ""
          )
        }        
        </Link>
        </div>
      </div>

        {children}

    <Footer/>   

    </div>
  )
}

export default AdminLayout
