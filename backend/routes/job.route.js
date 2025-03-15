import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postjob } from "../controllers/job.controler.js";


const router=express.Router();



router.post("/post",isAuthenticated,postjob)
router.get("/get",isAuthenticated,getAllJobs);
router.get("/getadminjobs",isAuthenticated,getAdminJobs)
router.get("/get/:id",isAuthenticated,getJobById);




export default router;
