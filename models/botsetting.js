import mongoose from "mongoose";

const botSchema = mongoose.Schema({
    botName : {
        type : String,
        unique: true,
        required: true
    },
    weatherAPI : {
        type : String,
        unique : true,
        required: true
    }
})
const BotModel = mongoose.model('Bots',botSchema);
export default BotModel;