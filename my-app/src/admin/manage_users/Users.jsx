import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy,faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { axiosClient2 } from '../../api/axios2';
import DashboardSide from '../../components/DashboardSide';
import UserSearch from '../../components/UserSearch';
import { useUserContext } from '../../providers/UserProvider';

const Users = () => {
    const [user ,setUser]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState('');
    const [copy,setCopy]=useState([]);
    const [filterData ,setFilterData]=useState([])
    const {count ,setCount}=useUserContext();

    useEffect(() => {

      if(user.length<1){
        const timeoutId = setTimeout(() => {
          setMessage('Sorry this pgae empty');
  
        }, 30000);
    
        return () => clearTimeout(timeoutId);
      }
    }, []);


  

  useEffect(()=>{
        fetchUsers()
    },[currentPage])

    useEffect(() => {
        console.log(user); 
      }, [user]); 

    useEffect(() => {
        console.log(totalPages); 
      }, [totalPages]); 

    const fetchUsers=async()=>{
        try {
            const response=await axiosClient2.get(`api/users?page=${currentPage}`);
            if(response.status==="failed"){
                console.log("failed fetch",response.data.message)
            }else{
                setUser(response.data.users.data)
                setTotalPages(response.data.users.last_page);
                setCopy([])
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
        const response=await axiosClient2.delete(`api/users/${id}`);
        console.log(response.data.message)
        hideDeleteConfirmation()
        fetchUsers()
    }

    const showDeleteConfirmation = (id) => {
        Swal.fire({
          title: 'Confirm Delete',
          text: 'Are you sure you want to delete this user?',
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



      const handleRole=(newRole,id)=>{

        const Data={
            role:newRole
        }
        axiosClient2.patch(`/api/users/${id}`,Data).then((response)=>{
          setCount(count+1)
            console.log(response)
            

        })
      }


      function copyTextToClipboard() {
        const emails=user.map((e)=>{
          return e.email
        })

      navigator.clipboard.writeText(emails)
        .then(() => {
          console.log('Text copied to clipboard');
          setCopy("copied")
        })
        .catch((err) => {
          console.error('Error copying text to clipboard', err);
        });
        }


        console.log(filterData)
  return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
    <div className='row'>
    <DashboardSide/>
    <div className='col-lg-10 col-md-10 col-sm-10'>
        <button type='button' onClick={copyTextToClipboard} className='btn  ms-4  rounded-4 p-2 text-white' style={{fontWeight:"bold",background:"rgb(129, 216, 94)"}}> <FontAwesomeIcon className='text-white' icon={faCopy} /> {copy.length<1?"Copy All Emails":"copied"}</button>
        <UserSearch api={`api/users/search`}  setVar={setFilterData} placeholder={"search by ID Or Email Or Name "} />

        
        <div className='card mx-auto ms-4 mt-4 p-3'>
        {user.length>0?(
            <>
            <h4 className='text-secondary' style={{fontWeight:"bold"}}> All Users</h4>
            <hr />
            <table className='table table-bordred w-100'>
            <thead>
                <tr>
                    <th >ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
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
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.first_name}</td>
                        <td>{e.last_name}</td>
                        <td>{e.email}</td>
                        <td>
                            <select name="role" id="role" onChange={(event)=>{handleRole((event.target.value),e.id)}} style={{width:"100%" ,fontWeight:"bold",marginTop:"7px"}}>
                                <option value={e.role}>{e.role}</option>
                                <option value={e.role==="admin"?"user":"admin"}>{e.role==="admin"?"user":"admin"}</option>
                            </select>
                        </td>
                        <td>
                            <button type="button" className='btn btn-danger text-white me-2'style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px' }}  onClick={()=>{handleDelete(e.id)}}>
                               Delete <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )


              )
              )
              ):(

                user?.map((e)=>(
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.first_name}</td>
                        <td>{e.last_name}</td>
                        <td>{e.email}</td>
                        <td>
                            <select name="role" id="role" onChange={(event)=>{handleRole((event.target.value),e.id)}} style={{width:"100%" ,fontWeight:"bold",marginTop:"7px"}}>
                                <option value={e.role}>{e.role}</option>
                                <option value={e.role==="admin"?"user":"admin"}>{e.role==="admin"?"user":"admin"}</option>
                            </select>
                        </td>
                        <td>
                            <button type="button" className='btn btn-danger text-white me-2'style={{fontWeight:"bold",display:"inline-block" ,borderRadius:'5px' }}  onClick={()=>{handleDelete(e.id)}}>
                               Delete <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )


              )




                
                )
            }
            </tbody>
            </table>

            <div  style={{visibility:filterData.length>0?"hidden":"visible"}}  className='d-flex align-items-center justify-content-center'>
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

export default Users 
