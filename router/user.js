import express from "express";
import {userStatus,deleteUser, getAllUsers} from "../controllers/user.js";
const router = express.Router();

router.get("/getallusers",getAllUsers);
router.put("/status/:chatId",userStatus);
router.delete("/delete/:chatId",deleteUser);

export default router;