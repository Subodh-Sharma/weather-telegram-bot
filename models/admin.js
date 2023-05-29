import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    loginId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        minLength: 10,
        maxLength: 10,
        required: true
    }
})
const AdminModel = mongoose.model('Admins',adminSchema);
export default AdminModel;
