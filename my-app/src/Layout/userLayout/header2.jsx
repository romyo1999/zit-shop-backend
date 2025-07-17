import React , {useState,useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import "./style.css"
import { useCartContext } from "../../providers/CartProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import CateModel from "./CateModel";
import Dropdown from 'react-bootstrap/Dropdown';
import { axiosClient2 } from '../../api/axios2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes , faSignOut , faCog,faChartLine, faL, faHeart, faCartShopping, faRemove, faList, faSearch      } from '@fortawesome/free-solid-svg-icons';
import zit from "../../assets/ZIT.svg"
import { useUserContext } from "../../providers/UserProvider";
export default function Header2(){
    const [term ,setTerm]=useState("")
   const [openModel,setOpenModel]=useState(false)
   const navigate=useNavigate()

const {user,count ,setCount}=useUserContext();
const {Data,refresh,setrefresh}=useCartContext()
console.log( Object.keys(user).length,"ddd")





//    const checkUser=()=>{
//     try {
//        axiosClient2.get("api/user/auth")
//        .then((res)=>{
//         setUser(res.data.user)
//         console.log(user)
//        })
        
//     } catch (error) {
//         if(error.response){
//             console.log(error.response)
//         }else{
//             console.log("error general")
//         }
//     }
//    }




   
   function handleChange(){
        if(openModel){
            setOpenModel(false)
        }else{
            setOpenModel(true)
        }    
   }



   const logout=async()=>{
    const res =await axiosClient2.get('api/user/logout');
        setrefresh(refresh + 1)
        navigate('/login')
        setCount(count + 1)
        setCount(count + 2)
        console.log(refresh)
        console.log(response)
        console.log(user)
        
    
   }



// const hash_term=term.replace(/ /g,"-")

  






    return (
        <React.Fragment >
            <div className='header-main '  >
               <Link to="/"  className='header-main text-dark ms-2 ' style={{width:"160px" }}> <img     className="img-fluid" src={zit} alt="shopping-cart--v2"/></Link>
                <button 
                className='border border-0 rounded bg-light m-4  ' 
                  onClick={()=>{handleChange()}}>
                    {
                        openModel?(
                            <FontAwesomeIcon className="fs-5" icon={faRemove}/>
                        ):(
                            <FontAwesomeIcon className="fs-5" icon={faList}/>
                        )
                    }
                Categories
                </button>
                <div className="input-group bg-white rounded-4 " style={{width:"80%",position:"relative",overflow:'hidden'}} >
                    <input type="text" onChange={(e)=>{setTerm(e.target.value.replace(/ /g,"-"))}} style={{borderColor:"black",display:"inline-block",width:'100%' ,zIndex:1}} placeholder=" Search" className="form-control w-50 input-search rounded rounded-4 "  aria-describedby="button-addon2" id="input-search"/>
                    <Link to={`/products/${term}`} className="border-1 search-btn" style={{position:"absolute",right:1,top:1.3,zIndex:2 ,height:"93%", paddingRight:'5px',paddingLeft:'5px',borderLeft:'3px' ,borderLeftStyle:"solid",borderLeftColor:"black",borderRight:"black",borderRightStyle:"solid",borderRightColor:"black" ,borderTopRightRadius:"15px",borderBottomRightRadius:"15px" ,}} ><FontAwesomeIcon className="text-white fs-4 mt-1 ps-2 me-2" icon={faSearch}/></Link>
                </div>

                {
                   Object.keys(user).length>0?(
                        <Dropdown >
                <Dropdown.Toggle id="dropdown-basic" style={{ display:"flex",flexDirection:"column" ,alignContent:"center",alignItems:"center",width:"100px" ,height:'60px', background:"white",border:0}}>
                   
                 <img style={{ width:'47px',height:"100px" ,borderRadius:'100%' ,marginBottom:"0px",border:"2px",borderStyle:"solid",borderColor:"rgb(65, 119, 136)",overflow:"hidden" ,background:'gray'}} 
                 src={`http://127.0.0.1:8000/storage/${user.image}`} alt="profile" />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{padding:'3px' ,boxShadow:"0 0 5px"}}>
                    <Dropdown.Item className="mb-2 mt-2 p-1 " style={{fontWeight:'bold'}} href="/profile"><FontAwesomeIcon icon={faCog }/> Account Setting</Dropdown.Item>

                    {
                        user.role==="admin"?(
                            <Dropdown.Item  className="mb-2 mt-2 p-1 " style={{fontWeight:'bold'}}  href="/admin/products/manage"><FontAwesomeIcon icon={faChartLine  }/> Admin Dashboard</Dropdown.Item>
                            ):(
                             <span></span>
                        )
                    }

                    <Dropdown.Item  className="mb-2 mt-2 p-1 " style={{fontWeight:'bold'}}  href="/myorders"><FontAwesomeIcon icon={faBoxes}/> My Orders</Dropdown.Item>
                    <Dropdown.Item  className="mb-2 mt-2 p-1 " style={{fontWeight:'bold'}}   onClick={logout} ><FontAwesomeIcon icon={faSignOut}/> SignOut</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                    ):(
                        <Link to="login" style={{minWidth:"fit-content",fontWeight:"bold"}} className='ms-2 me-2 text-dark text-decoration-none'><h6 className='mb-0'>Sing In</h6></Link>
                    )
                }

                <Link to="/favorites" className='rounded-circle pt-2 ps-2 pe-2 header-icon text-dark text-center'><FontAwesomeIcon style={{width:"32px", height:"32px"}} icon={faHeart}/></Link>
                <Link to="/cart" className='rounded-circle pt-2 ps-2 pe-2 me-4 ms-2 header-icon text-dark text-center text-decoration-none' style={{position:"relative"}}>
                    <FontAwesomeIcon style={{width:"32px", height:"32px"}} icon={faCartShopping}/>
                    {
                       user?(
                        Data>0?(
                            <span className="d-flex align-items-center justify-content-center" style={{fontSize:"16px",width:"20px",height:'20px',borderRadius:'100%',background:"red" ,padding:"5px",color:"white",position:"absolute",top:0,right:0}} >{Data}</span>
                           ):(
                               ""
                           )
                       ):(
                        ""
                       )
                    }
                </Link>
            </div>
            <CateModel open={openModel} onClose={()=>setOpenModel(false)}/>


        </React.Fragment>
    )
}
