import React,{useEffect,useState}from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
const Profile = () => {
   
   const[auth,setAuth]=useAuth()
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
    
useEffect(()=>{
const {email,name,phone,address}=auth?.user;
setName(name)
setPhone(phone)
setEmail(email)
setAddress(address)
},[auth?.user])
    
    
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  return (
   <Layout title={"Dashboard:-Users Profile"}>
            <div className="container-fluid p-3 m-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                <div className="form-container">
                <h1>USER PROFILE</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name'   />
                    </div>
                    <div className="mb-3">
            
                        <input type="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail2" placeholder='Enter Your Email' disabled  />

                    </div>
                    <div className="mb-3">
                        
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}className="form-control" id="exampleInputEmail3" placeholder='Enter Your Phone No' />

                    </div>
                    <div className="mb-3">
                        
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}className="form-control" id="exampleInputEmail4" placeholder='Enter Your Address' />

                    </div>
                   
                    <button type="submit" className="btn btn-primary">UPDATE</button>
                </form>
            </div>
                </div>

            </div>
        </div>
   </Layout>
  )
}

export default Profile
