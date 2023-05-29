import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    status: {
        type : String,
        default : "active"
    },
    chatId:{
        type: Number,
        unique: true,
        required: true
        
    }
})
const UserModel = mongoose.model('Users',userSchema);
export default UserModel;
