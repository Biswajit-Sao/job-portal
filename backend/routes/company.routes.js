import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUploadd } from "../middlewares/multer.js";

const router=express.Router();



router.post("/register",isAuthenticated,registerCompany)
router.get("/get",isAuthenticated,getCompany);
router.get("/get/:id",isAuthenticated,getCompanyById)
router.put("/update/:id",isAuthenticated,singleUploadd,updateCompany);




export default router;
