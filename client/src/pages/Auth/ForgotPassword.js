import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import  toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth';
const ForgotPassword = () => {
    const[email,setEmail]=useState("")
    const[newPassword,setnewPassword]=useState("")
    const[answer,setAnswer]=useState("")
    
    const navigate=useNavigate();

const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
            email,newPassword,answer
        });
        console.log(res.data.success)
        if(res.data.success){
            toast.success( res.data.message)
            navigate("/login");
        }
        else{
            toast.error(res.data.message)
          
        }
    }catch(error){
   console.log(error)
  toast.error("Something went wrong");
    }
}
  return (
    <Layout title={"Forgot Password-Ecommerce App"}>
        <div className="form-container">
        <h1>RESET PASSWORD</h1>
        <form onSubmit={handlesubmit}>
            <div className="mb-3">
                <input type="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail2" placeholder='Enter Your Email' required />
            </div>
            <div className="mb-3">                
                <input type="password" value={newPassword} onChange={(e)=>setnewPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' required/>
            </div>
            <div className="mb-3">                
                <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Favourite Sport' required/>
            </div>
            <button type="submit" className="btn btn-primary">RESET</button>

        </form>
    </div>
    </Layout>
  )
}

export default ForgotPassword
