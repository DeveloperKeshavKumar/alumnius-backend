import { Router } from "express";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob, } from "../controllers/jobs";
import { verifyRole, verifytoken } from "../middlewares/auth";
import { validateData } from "../middlewares/validate";
import { createJobSchema, updateJobSchema } from "../types/job";


const router = Router();

router.post("/", verifytoken, verifyRole('alumni'), validateData(createJobSchema), createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", verifytoken, verifyRole('alumni'), validateData(updateJobSchema), updateJob);
router.delete("/:id", verifytoken, verifyRole('alumni'), deleteJob);

export default router;