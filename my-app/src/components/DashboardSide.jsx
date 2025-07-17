import React, { useEffect, useState } from 'react'
import { Link ,NavLink, useNavigate } from 'react-router-dom'
import { axiosClient2 } from '../api/axios2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt ,faBoxes ,faUsers ,faShoppingCart, faHeart, faSignOut ,faTshirt ,faClipboardCheck, faQuestionCircle, faPercentage, faPercent       } from '@fortawesome/free-solid-svg-icons';
const DashboardSide = () => {
    const navigate=useNavigate()
    const logout=()=>{
        axiosClient2.get('api/user/logout').then((response)=>{
            console.log(response)
            navigate('/login')
            
        })
       }

    return (
<div className='col-lg-2 col-md-2 col-sm-2 ' style={{height:"auto",boxShadow:"0 0  3px" ,background:"white",display:"flex",flexDirection:"column"}}>
<h3 className='text-center mt-3'>Dashboard</h3>
<hr/>
<NavLink className='fs-4 m-3 text-dark dashboard custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/orders"}><FontAwesomeIcon icon={faClipboardCheck    } className='d-inline-block me-3 ms-2'/> Orders</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/sales"}><FontAwesomeIcon icon={faMoneyBillAlt  } className='d-inline-block me-3 ms-2'/> Sales</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/categores"}><FontAwesomeIcon icon={faTshirt       } className='d-inline-block me-3 ms-2'/> Categories</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/products/manage"}><FontAwesomeIcon icon={faBoxes     } className='d-inline-block me-3 ms-2'/> Products</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/users"}><FontAwesomeIcon icon={faUsers   } className='d-inline-block me-3 ms-2'/> Users</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/cart"}><FontAwesomeIcon icon={faShoppingCart   } className='d-inline-block me-3 ms-2'/> Cart</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/likes"}><FontAwesomeIcon icon={faHeart  } className='d-inline-block me-3 ms-2'/> Likes</NavLink>
<NavLink className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold"}} to={"/admin/discount"}><FontAwesomeIcon icon={faPercent  } className='d-inline-block me-3 ms-2'/> Discount</NavLink>
<div className='fs-4 m-3 text-dark dashboard  custom-hover rounded-4 p-1 ' style={{textDecoration:"none",fontWeight:"bold",cursor:"pointer"}} onClick={logout}><FontAwesomeIcon icon={faSignOut  } className='d-inline-block me-3 ms-2'/> Logout</div>
</div>
        )
  
}

export default DashboardSide
