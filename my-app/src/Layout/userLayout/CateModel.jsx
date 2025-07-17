import React from "react";
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import {Link } from "react-router-dom";
import hats from "../../assets/hats.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const CateModel=({open,onClose})=>{
    if (!open) return null

    function handleClose(){
            onClose()

        
           
    }


    return(
        <>
            <div className="overlay" >
                    <div className='model-right '>
                        <h6 style={{fontWeight:'bold',fontSize:"20px" ,marginTop:"10px"}}>Shop By Category </h6>
                        <FontAwesomeIcon icon={faRemove} className="pt-2 pb-2 ps-2 pe-2 fs-5 btn-hover text-center" style={{width:"23px", height:"23px"}} onClick={handleClose}/>
                    </div>
                    <hr/>
                <div className="container text-center">
                    <div className="row ">
                        <Link onClick={onClose} to="women" s className=" card-cat col-lg-3 col-sm-6 text-dark text-decoration-none  ">
                            <div className="image-div " >
                            <img className='cat-img-fix zoom-img' src="https://blog.nihaojewelry.com/wp-content/uploads/2020/04/puffy-sleeves%EF%BB%BF.jpg" alt="img"/>
                            </div>
                            <p>Women Clothing</p>
                        </Link>
                        <Link  onClick={onClose}  to="men" className="col-lg-3  card-cat col-sm-6  text-dark text-decoration-none">
                        <div className="image-div" >
                        <img className='cat-img-fix zoom-img' src="https://images.pexels.com/photos/3613388/pexels-photo-3613388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img"/>
                            </div>
                            <p>Men Clothing</p>
                        </Link>
                        <Link   onClick={onClose} to="kids" className="col-lg-3  card-cat col-sm-6 text-dark text-decoration-none">
                            <div className="image-div" >
                            <img className='cat-img-fix zoom-img' src="https://images.pexels.com/photos/1619705/pexels-photo-1619705.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img"/>
                            </div>
                            <p>Kids Clothing</p>
                        </Link>
                        <Link   onClick={onClose} to="hoodies" className="col-lg-3 card-cat col-sm-6  text-dark text-decoration-none">
                            <div className="image-div" >
                            <img className='cat-img-fix zoom-img' src="https://images.pexels.com/photos/15389454/pexels-photo-15389454/free-photo-of-men-and-women-in-hoodies.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img"/>
                            </div>
                            <p>Hoodies And SweatShrits</p>
                        </Link>


                        <Link  onClick={onClose}  to="hats" className="col-lg-3 card-cat col-sm-6  text-dark text-decoration-none">
                            <div className="image-div"  >
                            <img className='cat-img-fix zoom-img' src={hats} alt="img" />
                            </div>
                            <p>Hats</p>
                        </Link>
                        <Link   onClick={onClose} to="buckethats" className="col-lg-3 card-cat col-sm-6  text-dark text-decoration-none text-dark text-decoration-none">
                            <div className="image-div"  >
                            <img className='cat-img-fix zoom-img' src="https://images.pexels.com/photos/5699102/pexels-photo-5699102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img"/>
                            </div>
                            <p>Bucket Hats</p>
                        </Link>
                        <Link  onClick={onClose}  to="tshirts" className="col-lg-3 card-cat  col-sm-6  text-dark text-decoration-none text-dark text-decoration-none">
                            <div className="image-div" >
                            <img className='cat-img-fix zoom-img' src="https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img"/>
                            </div>
                            <p>T-shirts and Tops</p>
                        </Link>
                        <Link   onClick={onClose} to="dresses" className="col-lg-3 card-cat  col-sm-6  text-dark text-decoration-none text-dark text-decoration-none">
                            <div className="image-div"  >
                            <img className='cat-img-fix zoom-img' src="https://images.pexels.com/photos/12977688/pexels-photo-12977688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img"/>
                            </div>
                            <p>Dresses</p>
                        </Link>


                    </div>
                </div>
               
            </div>

        </>
    )
}
export default CateModel;
