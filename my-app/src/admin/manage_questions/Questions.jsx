import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage,faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import { axiosClient2 } from '../../api/axios2';
import DashboardSide from '../../components/DashboardSide';
import UserSearch from '../../components/UserSearch';
import { useUserContext } from '../../providers/UserProvider';
import Swal from 'sweetalert2';
const Questions = () => {
    const [questions ,setQuestions]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState('');
    const [C ,setC]=useState(0);
    const [loading ,setLoading]=useState(false)
    const [deleteLoading,setDeleteLoading]=useState(false)
    const {reload,setReload}=useUserContext()


    useEffect(() => {

      if(questions.length<1){
        const timeoutId = setTimeout(() => {
          setMessage('Sorry this page empty');
  
        }, 10000);
    
        return () => clearTimeout(timeoutId);
      }
    }, []);

  useEffect(()=>{
    fetchQuestions()
    },[currentPage])

    useEffect(() => {
        console.log(questions); 
      }, [questions]); 

    useEffect(() => {
        console.log(totalPages); 
      }, [totalPages]); 

useEffect(()=>{
Seen();
},[])


    const Seen=async()=>{
      axiosClient2.delete("/api/notification").then((res)=>{
        console.log(res)
        setReload(reload+1)
        console.log("ddd")
      });

    }

    const fetchQuestions=async()=>{
        setLoading(true)
        try {
            const response=await axiosClient2.get(`api/contact?page=${currentPage}`);
            if(response.status==="failed"){
                console.log("failed fetch",response.data.message)
            }else{
                console.log(response)
                setQuestions(response.data.messages.data)
                setC(response.data.count)
                setTotalPages(response.data.messages.last_page);
                 
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
        setLoading(false)

     
        
    }
        

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

const handleDelete= async(e)=>{
    setDeleteLoading(true)
    const response =await axiosClient2.delete(`/api/contact/${e}`);
    console.log(response)
    fetchQuestions()
    setDeleteLoading(false)
    hideDeleteConfirmation();
}


const Delete=(id)=>{
  showDeleteConfirmation(id)        
}

const showDeleteConfirmation = (id) => {
  Swal.fire({
    title: 'Confirm Delete',
    text: 'Are you sure you want to delete this message?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(id);

    }
  });
};

const hideDeleteConfirmation = () => {
  Swal.close();
};


  return (
    <>
    <div className='container-fluid' style={{background:"#f0f0f0"}}>
    <div className='row'>
    <DashboardSide/>
    <div className='col-lg-10 col-md-10 col-sm-10'>
        <div className='text-white ms-4 mt-3 p-4 rounded-2 d-flex align-items-center justify-content-center'  style={{fontWeight:"bold",fontSize:"20px",width:'20%',height:"5%" ,boxShadow:"0 0 5px green",background:"rgb(129, 216, 94)"}}>
          {C} Message  <FontAwesomeIcon icon={faMessage}  className='ms-3 fs-3'/>
        </div>
        <div className='card mx-auto ms-3 mt-3 p-3'>
        {questions.length>0?(
                loading?(
                <div className='d-flex align-items-center justify-content-center' style={{height:"556px"}}>
                      <di>Loading <Spinner/></di>
                </div>
                ):(
                    <>
                    <h4 className='text-secondary' style={{fontWeight:"bold"}}> All Likes</h4>
                    <hr />
                    <table className='table table-bordred w-100' style={{overflow:"scroll"}}>
                    <thead >
                        <tr>
                            <th >ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th colSpan={3}>Message</th>
                            <th>Delete</th>
        
                        </tr>
                    </thead>
        
                    <tbody>
                    {
                        questions?.map((e)=>(
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.full_name}</td>
                                <td>{e.email}</td>
                                <td colSpan={3}>
                                    {e.message}
                                </td>
                                <td>
                                    <button onClick={()=>Delete(e.id)} className='btn btn-danger '>
                                       Delete <FontAwesomeIcon icon={faTrash}/>                                        
                                    </button>
                                </td>
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
                )
                
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

export default Questions 
