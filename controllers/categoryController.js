import catagoryModel from "../models/catagoryModel.js";
import slugify from "slugify";
export const createCategoryController=async(req,res)=>{
    try{
     const {name}=req.body;
     if(!name){
       return res.status(404).send({message:"Name required"})
     }
     const existingCategory=await catagoryModel.findOne({name})
     if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"Category Already Exists"
        })
     }
     const category=await new catagoryModel({name,slug:slugify(name)}).save()
     res.status(201).send({
        success:true,
        message:"New Category Created",
        category
     })
    }
    catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message:"Error in catagory"
  })
    }
};
//update category
export const updateCategoryController=async(req,res)=>{
  try{
    const {name}=req.body
    const {id}=req.params
   const category=await catagoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
   res.status(200).send({
    success:true,
    message:'Category Updated Succesfully',
    category
   })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error while updating category"
    })
  }
};
export const categoryController=async(req,res)=>{
  try{
     const category=await catagoryModel.find({})
     res.status(200).send({
      success:true,
      message:"All Categories List",
      category
     })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error while getting All categories"
    })
  }
};
export const singlecategoryController=async(req,res)=>{
  try{
    const {slug}=req.params
     const category=await catagoryModel.findOne({slug})

     res.status(200).send({
      success:true,
      message:"Get Single Category Successfully",
      category
     })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error while getting Single category"
    })
  }
};
export const deleteCategoryController=async(req,res)=>{
  try{
    const {id}=req.params
   await catagoryModel.findByIdAndDelete(id)

     res.status(200).send({
      success:true,
      message:"Category deleted Successfully",
    
     })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error while deleting category"
    })
  }
};