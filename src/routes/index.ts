import { Router } from "express";
import authRouter from "./auth";
import eventRouter from "./event";
import eventRegistrationRouter from "./eventRegistrations";
import jobsRouter from "./jobs";
import successStoriesRouter from "./successStories";

const router = Router();

router.get('/', (req, res) => {
   res.send("Server is up and running");
})

router.use('/auth', authRouter);
router.use('/events', eventRouter);
router.use('/event-register', eventRegistrationRouter);
router.use('/jobs', jobsRouter);
router.use('/success-stories', successStoriesRouter);


export default router;