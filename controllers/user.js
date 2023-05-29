import UserModel from "../models/users.js";

export const register = async(msg)=>{
    try{
        const existingUser = await UserModel.findOne({chatId:msg.chat.id});
        if(existingUser) return "You are already registrated.";
        const newUser = new UserModel({firstName:msg.chat.first_name,lastName:msg.chat.last_name,chatId:msg.chat.id});
        await newUser.save();
        return "Thanks for joining us."
    }catch(error){
        console.log(error);
        return "Something went wrong, Try again."
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.json({ message: "Something went wrong." })
    }
}

export const userStatus = async(req,res)=>{
    const {chatId} = req.params;
    console.log(chatId);
    try{
        const existingUser = await UserModel.findOne({chatId:chatId});
        if(!existingUser) return res.json({message:"User doesn't exist"});
        if(existingUser.status==="active"){
            await UserModel.findOneAndUpdate({chatId:chatId},{status:"block"},{new:true});
        }
        else{
            await UserModel.findOneAndUpdate({chatId:chatId},{status:"active"},{new:true});
        }
        const users = await UserModel.find();
        res.json(users);
    }catch(error){
        res.json({message:"Something went wrong"});
    }
}

export const deleteUser = async(req,res)=>{
    const {chatId} = req.params;
    try{
        const existingUser = await UserModel.findOne({chatId:chatId});
        if(!existingUser) return res.json({message:"User doesn't exist"});

        await UserModel.findOneAndRemove({chatId:chatId});
        const users = await UserModel.find();
        res.json(users);
    }catch(error){
        res.json({message:"Something went wrong"});
    }
}