import React ,{useState,useEffect} from 'react'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import { axiosClient } from '../api/axios'
import { axiosClient2 } from '../api/axios2'
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap'

import { useUserContext } from '../providers/UserProvider'
const Profile = () => {

    // const [Image ,setImage]=useState("")
    const [userId ,setUserId]=useState()
    const [PageLoading ,setPageLoading]=useState(false)
    const [FirstName ,setFirstName]=useState("")
    const [LastName ,setLastName]=useState("")
    const [Address ,setAddress]=useState("")
    const [Phone ,setPhone]=useState("")
    const [Image ,setImage]=useState("")
    const [loading,setloading]=useState(false)
    const [uploadLoading ,setUploadLoading]=useState(false)
    const {count ,setCount}=useUserContext();

    const [Errors ,SetErrors]=useState([])


      useEffect(()=>{
      fetchData()
      },[])

    const fetchData=()=>{
      axiosClient.get("/api/user/profile").then((res)=>{
        console.log(res.data.user)
        setImage(res.data.user.image)
        setFirstName(res.data.user.first_name)
        setLastName(res.data.user.last_name)
        setAddress(res.data.user.address)
        setPhone(res.data.user.phone)
        setUserId(res.data.user.id)
        setPageLoading(true)
      setUploadLoading(false)

      })


    }

    const updateImage=(Image)=>{
        const Data= new FormData();
        Data.append("image",Image)

        axiosClient.post(`/api/user/profile/image/${userId}`,Data)
        .then((Response)=>{
          console.log(Response)

        })

    }


    const updateProfile =async(e)=>{
      e.preventDefault();
      setloading(true)
      const data={
        first_name:FirstName,
        last_name:LastName,
        address:Address,
        phone:Phone
      }

      try {
       const res = await axiosClient2.put(`api/user/profile/${userId}`,data)
          console.log(res)
          SetErrors([])
          toast.success('updated successfully');
      } catch (error) {
        if (error.response){
          SetErrors(error.response.data.errors)
          toast.error('Failed to update the information');
        }
      }
      setloading(false)

    }


 

  return (
    <div  className='container-fluid mt-4 d-flex flex-column align-items-center justify-content-center w-100' >
      <div className='row'>
      <div className=' border-0  bg-white col-lg-12 col-md-12 col-sm-12 mx-auto  card m-4'>

        {PageLoading?(
          <div>
            <h2 style={{fontWeight:"bold",textAlign:"center"}}>Profile Image</h2>
        <div className='line mb-3'></div>
        <div className='m-2 w-100 d-flex  align-items-center'>


        <img 
        style={{ background:"silver"}}
        width={100} height={100} 
        className='rounded-circle d-inline-block ms-4 me-2'
         src={`http://127.0.0.1:8000/storage/${Image}`}
         />


        <input type='file'  onChange={(e)=>{updateImage(e.target.files[0])}} className='d-inline-block me-3' />
        <button style={{fontWeight:"bold" ,width:"100px" }} onClick={()=>{ setUploadLoading(true);  fetchData();setCount(count+1)}} className='btn  btn-primary d-inline-block '>
        {
          uploadLoading?(
            <Spinner style={{width:'20%' ,height:"15px" }}/>
          ):(
            "Upload"
          )
        }

        </button>
        </div>
        <h2 style={{fontWeight:"bold" ,textAlign:"center"}} className='mt-4'>Profile Information</h2>
        <div className='line mb-3'></div>
        <div className='w-100'>
          
          <form onSubmit={(e)=>{updateProfile(e)}}>

          <Input label=" First Name "
        required={true}
        placeholder="entre your first name"
        type="text"
        setVar={setFirstName}
        var={FirstName}
        error={Errors.first_name?true:false}
        />
       <small style={{display:"inline-block", width:"100%",textAlign:"center" ,color:"red",fontWeight:"bold"}}>{Errors.first_name}</small>

        <Input label=" Last Name "
        required={true}
        placeholder="entre your last name"
        type="text"
        setVar={setLastName}
        var={LastName}
        error={Errors.last_name?true:false}
        />
       <small style={{display:"inline-block", width:"100%",textAlign:"center" ,color:"red",fontWeight:"bold"}}>{Errors.last_name}</small>

        <TextArea label="Address "
        required={true}
        placeholder="entre your Address , zip code ,city   "
        type="text"
        setVar={setAddress}
        var={Address}
        error={Errors.address?true:false}

        />
       <small style={{display:"inline-block", width:"100%",textAlign:"center" ,color:"red",fontWeight:"bold"}}>{Errors.address}</small>


        <Input label=" Phone "
        required={true}
        placeholder="+212 00 00 00 00 "
        type="text"
        setVar={setPhone}
        var={Phone}
        error={Errors.phone?true:false}
        />
       <small style={{display:"inline-block", width:"100%",textAlign:"center" ,color:"red",fontWeight:"bold" }} >{Errors.phone}</small>


        <button type='submit'  className='btn btn-primary p-1  w-100 text-white mt-4 fs-4' style={{borderRadius:"15px",fontWeight:"bold"}}  >
                        {loading?(
                            <Spinner/>
                        )
                        :(
                            "UPDATE"
                        )}
                        
        </button>

          </form>

        </div>
      <div>


      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />

          </div>

        ):(
            
          <div className='d-flex align-items-center justify-content-center' style={{height:"556px"}}>
            <di>Loading <Spinner/></di>
         </div>
        )
        
        }



      




      </div>
      </div>
    </div>
  )
}

export default Profile
