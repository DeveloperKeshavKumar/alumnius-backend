import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { validateData } from "../middlewares/validate";
import { loginUserSchema, registerUserSchema } from "../types/user";

const router = Router();

router.post('/register', validateData(registerUserSchema), registerUser);
router.post('/login', validateData(loginUserSchema), loginUser);

export default router;