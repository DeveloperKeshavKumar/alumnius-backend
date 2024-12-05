import { Router } from "express";
import { createSuccessStory, getAllSuccessStories, getSuccessStoryById, updateSuccessStory, deleteSuccessStory, } from "../controllers/successStories";
import { verifytoken } from "../middlewares/auth";
import { validateData } from "../middlewares/validate";
import { createSuccessStorySchema, updateSuccessStorySchema } from "../types/successStories";

const router = Router();

router.post("/", verifytoken, validateData(createSuccessStorySchema), createSuccessStory);
router.get("/", getAllSuccessStories);
router.get("/:id", getSuccessStoryById);
router.put("/:id", verifytoken, validateData(updateSuccessStorySchema), updateSuccessStory);
router.delete("/:id", verifytoken, deleteSuccessStory);

export default router;
