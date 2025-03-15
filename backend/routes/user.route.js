import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, singleUploadd } from "../middlewares/multer.js";

const router=express.Router();



router.post("/register",singleUpload,register)
router.post("/login",login);
router.post("/profile/update",isAuthenticated,singleUploadd,updateProfile)


router.get("/logout",logout)

export default router;


