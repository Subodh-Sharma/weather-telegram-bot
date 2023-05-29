import AdminModel from "../models/admin.js";

export const adminLogin = async(req,res)=>{
    const {loginId,password} = req.body;
    try{
        const existingAdmin = await AdminModel.findOne({loginId:loginId});
        if(!existingAdmin) return res.status(400).json({message:"Invalid Credentials"});
        if(existingAdmin.password!==password){
            return res.status(400).json({message:"Invalid Credentials"})
        }else{
            return res.status(201).json({result:existingAdmin});
        }
    }catch(err){
        res.status(404).json({message:"Something went wrong"})
        console.log(err);
    }
}