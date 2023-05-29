import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { register } from "./controllers/user.js";
import userRouter from "./router/user.js";
import adminRouter from "./router/admin.js";
import UserModel from "./models/users.js";

const app = express();
dotenv.config();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended: true}));
app.use(cors());


// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use("/user",userRouter);
app.use("/admin",adminRouter);

//-------------------Deployment code---------------------//

const __dirname1 = path.resolve();
 console.log(__dirname1);
if (process.env.NODE_ENV === "production") {
  app.use(Express.static(path.join(__dirname1, "/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });
}

//-------------------Deployment code---------------------//
const port = process.env.PORT;
const url = process.env.DB_URL;

mongoose.connect(url).then(()=>{
    app.listen(port,()=>{
        console.log(`Listening at port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  const input = msg.text;
  if(input==="/start"){
    const message = await register(msg);
    bot.sendMessage(chatId, message);
  }else{
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.API_KEY}`
    );
    const weatherData = response.data;
    const weather = weatherData.weather[0].description;
    const temperature = weatherData.main.temp - 273.15;
    const city = weatherData.name;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const windSpeed = weatherData.wind.speed;
    // console.log(weatherData);

    const user = await UserModel.findOne({chatId:chatId});
    if(user.status==="block"){
      bot.sendMessage(chatId, "You are blocked to access this service.");
    }else{
    const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(
      2
    )}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
    bot.sendMessage(chatId, message);
    }
  } catch (error) {
    bot.sendMessage(chatId, "City doesn't Exist.");
  }
}
});


