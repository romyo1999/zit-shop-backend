import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosClient } from '../../api/axios';
import { faArrowLeft, faArrowRight,faTrash ,faEdit,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { axiosClient2 } from '../../api/axios2';
import DashboardSide from '../../components/DashboardSide';

const Categoryes = () => {
    const [cat ,setCat]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {

      if(cat.length<1){
        const timeoutId = setTimeout(() => {
          setMessage('Sorry this page empty');
  
        }, 30000);
    
        return () => clearTimeout(timeoutId);
      }
    }, []);


  

  useEffect(()=>{
        fetchCategories()
    },[currentPage])

    useEffect(() => {
        console.log(cat); 
      }, [cat]); 
    useEffect(() => {
        console.log(totalPages); 
      }, [totalPages]); 

    const fetchCategories=async()=>{
        try {
            const response=await axiosClient.get(`api/category?page=${currentPage}`);
            if(response.status==="failed"){
                console.log("failed fetch",response.data.message)
            }else{
                setCat(response.data.categories.data)
                console.log(response.data.categories)
                setTotalPages(response.data.categories.last_page);
                console.log(totalPages)
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
        

    const handleDelete=(id)=>{
            showDeleteConfirmation(id)

            
            
    }

    const  confirmDelete=async(id)=>{
        const response=await axiosClient2.delete(`api/category/${id}`);
        console.log(response.data.message)
        hideDeleteConfirmation()
        fetchCategories()
    }

    const showDeleteConfirmation = (id) => {
        Swal.fire({
          title: 'Confirm Delete',
          text: 'Are you sure you want to delete this category?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            confirmDelete(id);

          }
        });
      };
    
      const hideDeleteConfirmation = () => {
        Swal.close();
      };
    

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
  return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
    <div className='row'>
    <DashboardSide/>
    <div className='col-lg-10 col-md-10 col-sm-10'>
        <Link to="/admin/create_category" className='btn  ms-4 mt-4 text-white' style={{fontWeight:"bold",background:"rgb(129, 216, 94)"}}> <FontAwesomeIcon className='text-white' icon={faPlus} />Add Category</Link>
        <div className='card mx-auto ms-4 mt-4 p-3'>
        {cat.length>0?(
            <>
            <h4 className='text-secondary' style={{fontWeight:"bold"}}> All Categores</h4>
            <hr />
            <table className='table table-bordred w-100'>
            <thead>
                <tr>
                    <th >ID</th>
                    <th>Name</th>
                    <th colSpan={2}>Feature</th>
                    <th>action</th>
                </tr>
            </thead>

            <tbody>
            {
                cat?.map((e)=>(
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td colSpan={2} style={{maxWidth:"200px"}}>{e.feature}</td>
                        <td>
                            <button className='btn btn-danger text-white me-2 m-1' value={"Delete"} style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px' }} type='button' onClick={()=>{handleDelete(e.id)}}>
                            Delete <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <Link   to={`/admin/update_category/${e.id}`} className='btn m-1' style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px',background:"green" ,color:"white" }}> 
                            Update <FontAwesomeIcon icon={faEdit} /> 
                            </Link>
                        </td>
                    </tr>
                ))
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

export default Categoryes
