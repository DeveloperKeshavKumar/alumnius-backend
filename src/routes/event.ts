import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, } from '../controllers/events';
import { verifyRole, verifytoken } from '../middlewares/auth';
import { validateData } from '../middlewares/validate';
import { createEventSchema, updateEventSchema } from '../types/event';

const router = express.Router();

router.post('/create', verifytoken, verifyRole('alumni'), validateData(createEventSchema), createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/update/:id', verifytoken, verifyRole('alumni'), validateData(updateEventSchema), updateEvent);
router.delete('/delete/:id', verifytoken, verifyRole('alumni'), deleteEvent);

export default router;