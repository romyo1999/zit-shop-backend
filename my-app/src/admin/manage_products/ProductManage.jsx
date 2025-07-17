import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { axiosClient } from '../../api/axios';
import { faArrowLeft, faArrowRight,faTrash  } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ImageLoading from '../../components/Image';
import DashboardSide from '../../components/DashboardSide';
import InputSearch from '../../components/InputSearch';

const ProductManage = () => {
    const [Products ,setProducts]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState('');
    const [filterData ,setFilterData]=useState([])





    useEffect(() => {

      if(Products.length<1){
        const timeoutId = setTimeout(() => {
          setMessage('Sorry this pgae empty');
  
        }, 30000);
    
        return () => clearTimeout(timeoutId);
      }
    }, []);



  useEffect(()=>{
        fetchProducts()
    },[currentPage])

    useEffect(() => {
        console.log(Products); 
      }, [Products]); 
    useEffect(() => {
        console.log(totalPages); 
      }, [totalPages]); 

    const fetchProducts=async()=>{
        try {
            const response=await axiosClient.get(`api/products/manage?page=${currentPage}`);
            console.log(response.data.product.data)
            if(response.status==="failed"){
                console.log("failed fetch",response.data.message)
            }else{
                setProducts(response.data.product.data)
                setTotalPages(response.data.product.last_page);
                console.log(Products)
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
            console.log(id)
            showDeleteConfirmation(id)      
    }

    const  confirmDelete=async(id)=>{
        const response=await axiosClient.delete(`api/product/${id}`);
        fetchProducts()
        hideDeleteConfirmation()
    }

    const showDeleteConfirmation = (id) => {
        Swal.fire({
          title: 'Confirm Delete',
          text: 'Are you sure you want to delete this Product?',
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

      console.log(filterData)
  return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
    <div className='row'>
    <DashboardSide/>
    <div className='col-lg-10 col-md-10 col-sm-10 '>
        <Link to="/admin/create_product" className='btn  ms-4  rounded-4 p-2 text-white' style={{fontWeight:"bold",background:"rgb(129, 216, 94)"}}> <FontAwesomeIcon className='text-white' icon={faPlus} />Add Product</Link>
        <InputSearch api={`api/products`}  setVar={setFilterData} placeholder={"search by ID Or Title Or Or Description "} />
        <div className='card mx-auto ms-4 mt-4 p-3' style={{overflowX:"scroll" ,height:"800px",overflowY:"scroll"} }>
        {Products.length>0?(
            <>
            <h4 className='text-secondary' style={{fontWeight:"bold",width:"auto"}}> All Products</h4>
            <hr style={{width:"100%"}} />
            <table className='table table-bordred '>
            <thead>
                <tr>
                    <th >ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category ID</th>
                    <th>Image1</th>
                    <th>Image2</th>
                    <th>action</th>
                </tr>
            </thead>

            <tbody>
            {


                filterData.length>0?(
                  filterData[0]===404?(
                    <td colSpan={6} rowSpan={6} >
                    <div className='text-center mt-4 '>We couldn't find any results for <span style={{fontWeight:'bold'}}>{filterData[1]}</span></div>
                  </td>                    
                  ):(
                      filterData?.map((e)=>(
                        <tr key={e.id} >
                            <td><div className='mt-4'>{e.id}</div></td>
                            <td><div className='mt-4 w-100 h-100 ' style={{wordBreak:'break-word',overflowY:'hidden'}}>{e.title}</div></td>
                            <td><div className='mt-4'>{e.price}</div></td>
                            <td><div className='mt-4'>{e.category_id}</div></td>
                            <td >
                            <ImageLoading
                              path={`http://127.0.0.1:8000/storage/${e.image1}`}
                              alt={e.title}
                              w={100}
                              h={100}
                              />
                            </td>
    
                            <td >
                            <ImageLoading
                              path={`http://127.0.0.1:8000/storage/${e.image2}`}
                              alt={e.title}
                              w={100}
                              h={100}
                              />
                            </td>
    
                            <td >
                            <div className='mt-4'>
                            <button className='btn btn-danger text-white me-2 m-1 '  style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px' }} type='button' onClick={()=>{handleDelete(e.id)}}>
                                Delete <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link   to={`/admin/update_product/${e.id}`} className='btn m-1' style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px',background:"green" ,color:"white" }}> 
                                Update <FontAwesomeIcon icon={faEdit} /> 
                                 </Link>
                            </div>
                            </td>
                        </tr>
                    ))
                   
                   )
                ):(
                    Products?.map((e)=>(
                    <tr key={e.id} >
                        <td><div className='mt-4'>{e.id}</div></td>
                        <td><div className='mt-4'>{e.title}</div></td>
                        <td><div className='mt-4'>{e.price}</div></td>
                        <td><div className='mt-4'>{e.category_id}</div></td>
                        <td >
                        <ImageLoading
                          path={`http://127.0.0.1:8000/storage/${e.image1}`}
                          alt={e.title}
                          w={100}
                          h={100}
                          />
                        </td>

                        <td >
                        <ImageLoading
                          path={`http://127.0.0.1:8000/storage/${e.image2}`}
                          alt={e.title}
                          w={100}
                          h={100}
                          />
                        </td>

                        <td >
                        <div className='mt-4'>
                        <button className='btn btn-danger text-white me-2 m-1 ' value={"Delete"} style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px' }} type='button' onClick={()=>{handleDelete(e.id)}}>
                            Delete <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <Link   to={`/admin/update_product/${e.id}`} className='btn m-1' style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px',background:"green" ,color:"white" }}> 
                            Update <FontAwesomeIcon icon={faEdit} /> 
                             </Link>
                        </div>
                        </td>
                    </tr>
                ))
                
                )

            }
            </tbody>
            </table>

            <div style={{visibility:filterData.length>0?"hidden":"visible"}} className='d-flex align-items-center justify-content-center'>
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

export default ProductManage
