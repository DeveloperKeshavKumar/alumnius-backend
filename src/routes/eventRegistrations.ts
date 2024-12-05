import express from 'express';
import { registerForEvent, getRegistrationsForEvent, unregisterFromEvent, } from '../controllers/eventRegistrations';
import { verifyRole, verifytoken } from '../middlewares/auth';
import { validateData } from '../middlewares/validate';
import { createEventRegistrationSchema, updateEventRegistrationSchema } from '../types/event';

const router = express.Router();

// Define routes
router.post('/register', verifytoken,verifyRole('alumni'), validateData(createEventRegistrationSchema), registerForEvent);
router.get('/event/:eventId', getRegistrationsForEvent);
router.delete('/unregister', verifytoken, verifyRole('alumni'), validateData(updateEventRegistrationSchema), unregisterFromEvent);

export default router;
