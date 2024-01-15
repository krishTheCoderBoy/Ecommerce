import  {comparePassword, hashedPassword}  from "../helpers/authHelper.js"
import usermodel from "../models/usermodel.js"
import jwt from "jsonwebtoken"
import orderModel from "../models/orderModel.js"
export const registerController=async(req,res)=>{
    try{
       const{name,email,password,phone,address,answer,role}=req.body
       
       if(!name){
        return res.send({message:"Name is Required"})
       }
       if(!email){
        return res.send({message:"Email is Required"})
       }
       if(!password){
        return res.send({message:"Password is Required"})
       }
       if(!phone){
        return res.send({message:"Phone no is Required"})
       }
       if(!address){
        return res.send({message:"Adress is Required"})
       }
       if(!answer){
        return res.send({message:"Answer is Required"})
       }
       //check user
       const existUser=await usermodel.findOne({email})
       //existing user
          if(existUser){
            return res.status(200).send({
                success:false,
                message:"Already Registerd Please Login"
            })
          }
       const hashedPass=await hashedPassword(password)
       const user=await new usermodel({name,email,phone,address,password:hashedPass,answer,role}).save()
      res.status(200).send({
        success:true,
        message:"User Register Successfully",
        user,
      })
    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Registration",
        error
    })
    }

}
export const loginController=async(req,res)=>{
try{
  const{email,password}=req.body
  if(!email||!password){
    return res.status(404).send({
      success:false,
      message:"Invalid email or password"
    })
    
  }
  const user=await usermodel.findOne({email});
  if(!user){
    return res.status(404).send({
      success:false,
      message:"Email is not registered"
    })
  }
  const match=await comparePassword(password,user.password)
  if(!match){
    return res.status(200).send({
      success:false,
      message:"Invalid Password"
    })
  }
  //token
  const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
    expiresIn:'7d',
  });
  res.status(200).send({
    success:true,
    message:"login successfully",
    user:{
      name:user.name, 
      email:user.email,
      phone:user.phone, 
      address:user.address,
      role:user.role,
    },
    token,
  })

}catch(error){
  console.log(error)
  res.status(500).send({
      success:false,
      message:"Error in login",
      error
  })
  }
}
//forgotPasswordController
export const forgotPasswordController=async(req,res)=>{
try{
  const{email,answer,newPassword}=req.body
if(!email){
  res.status(400).send({message:"Email is Required"})
}
if(!answer){
  res.status(400).send({message:"answer is required"})
}
if(!newPassword){
  res.status(400).send({message:"newPAssword is required"})
}
const user =await usermodel.findOne({email,answer})
if(!user){
  return res.status(404).status({
    success:false,
    message:"wrong Email Or Answer"
  })
}
const hashed=await hashedPassword(newPassword)
await usermodel.findByIdAndUpdate(user._id,{password:hashed});
res.status(200).send({
  success:true,
  message:"message reset successfully",
})

}catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Something went wrong",
    error
  })
}
}

export const testController=(req,res)=>{
  try{
    res.send("Protected Routes");
  }catch(error){
    console.log(error)
    res.send({error})
  }
}
//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashPassword = password ? await hashedPassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
//orders
export const getOrdersController=async(req,res)=>{
try{
const orders=await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
res.json(orders);

}catch(error){
  console.log(error);
  res.status(400).send({
    success: false,
    message: "Error WHile Getting Orders",
    error,
  });
}
}
//all-orders
export const getAllOrdersController=async(req,res)=>{
  try{
  const orders=await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:"-1"});
  res.json(orders);
  
  }catch(error){
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Getting Orders",
      error,
    });
  }
  }
  //order status
  export const orderStatusController=async(req,res)=>{
    try{
      const {orderId}=req.params;
      const {status}=req.body;
    const orders=await orderModel.findByIdAndUpdate(
      orderId,
      {status},{new:true}
    );
    res.json(orders);
    
    }catch(error){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Updating Orders",
        error,
      });
    }
    }