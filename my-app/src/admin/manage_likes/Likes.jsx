import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy,faHeart,faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import { axiosClient2 } from '../../api/axios2';
import DashboardSide from '../../components/DashboardSide';
import UserSearch from '../../components/UserSearch';

const Likes = () => {
    const [likes ,setLikes]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState('');
    const [count ,setCount]=useState(0);

    useEffect(() => {

      if(likes.length<1){
        const timeoutId = setTimeout(() => {
          setMessage('Sorry this page empty');
  
        }, 10000);
    
        return () => clearTimeout(timeoutId);
      }
    }, []);


  

  useEffect(()=>{
    fetchLikes()
    },[currentPage])

    useEffect(() => {
        console.log(likes); 
      }, [likes]); 

    useEffect(() => {
        console.log(totalPages); 
      }, [totalPages]); 

    const fetchLikes=async()=>{
        try {
            const response=await axiosClient2.get(`api/likes?page=${currentPage}`);
            if(response.status==="failed"){
                console.log("failed fetch",response.data.message)
            }else{
                setLikes(response.data.likes.data)
                setCount(response.data.count)
                setTotalPages(response.data.likes.last_page);
            }
        } catch (error) {
            if(error.response){
                console.error("Response Error",error.response.data)
                console.error("Status Error",error.response.status)
                console.error("Headers",error.response.headers)
            }else if(error.request){
                console.error("Request Error" ,error.request)
            }else{
                console.error("general Error" ,error.message)
            }
        }
    }
        

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };


  return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
    <div className='row'>
    <DashboardSide/>
    <div className='col-lg-10 col-md-10 col-sm-10'>
        <div className='text-white ms-4 mt-3 p-4 rounded-2 d-flex align-items-center justify-content-center'  style={{fontWeight:"bold",fontSize:"20px",width:'20%',height:"8%" ,boxShadow:"0 0 5px green",background:"rgb(129, 216, 94)"}}>
          {count} Likes  <FontAwesomeIcon icon={faHeart}  className='ms-2 fs-3'/>
        </div>
        <div className='card mx-auto ms-3 mt-3 p-3'>
        {likes.length>0?(
            <>
            <h4 className='text-secondary' style={{fontWeight:"bold"}}> All Likes</h4>
            <hr />
            <table className='table table-bordred w-100'>
            <thead>
                <tr>
                    <th >ID</th>
                    <th>User ID</th>
                    <th>Product ID</th>
                    <th>Time</th>

                </tr>
            </thead>

            <tbody>
            {
                likes?.map((e)=>(
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.user_id}</td>
                        <td>{e.product_id}</td>
                        <td>{e.formatted_created_at}</td>
                    </tr>
                )
              )
                }


                
            </tbody>
            </table>

            <div className='d-flex align-items-center justify-content-center'>
            <button className="pagination-button rounded-circle p-2 m-2" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <FontAwesomeIcon className='' icon={faArrowLeft} /> 
            </button>
            <span  className="pagination-info fs-6 ">{`Page ${currentPage} of ${totalPages}`}</span>
            <button className="pagination-button rounded-circle p-2 m-2" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
             <FontAwesomeIcon className='' icon={faArrowRight} />
            </button>
          </div>
            </>
                
                ):(
                   <div className='d-flex align-items-center justify-content-center' style={{height:"556px"}}>
                    {
                    message?(
                      <h2>{message}</h2>
                    ):( 
                      <di>Loading <Spinner/></di>)
                  
                  }
                   
                   </div>
                )}


        </div>

    </div>
    </div>

    </div> 
    </>
  )
}

export default Likes 
