import { Request, Response } from 'express';
import { db } from '../config/db';
import { eventsTable } from '../schemas';
import { eq } from 'drizzle-orm';

export const createEvent = async (req: Request, res: Response): Promise<void> => {
   try {
      const { title, description, location, isPublic } = req.body;
      const eventDate = new Date(req.body.date);

      if (!title || !description || !eventDate || !location ) {
         res.status(400).json({
            success: false,
            message: "All fields (title, description, date, location) are required.",
         });
         return;
      }

      const [newEvent] = await db.insert(eventsTable).values({
         title,
         description,
         date: eventDate,
         location,
         organizerId: req.user?.id,
         isPublic,
      }).returning();

      res.status(201).json({
         success: true,
         message: "Event created successfully",
         event: newEvent,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
         date: new Date(req.body.date) 
      });
   }
};

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
   try {
      const events = await db.select().from(eventsTable).where(eq(eventsTable.isDeleted, 'N'));

      res.status(200).json({
         success: true,
         events,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));

      if (!event) {
         res.status(404).json({
            success: false,
            message: "Event not found",
         });
         return;
      }

      res.status(200).json({
         success: true,
         event,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const { title, description, date, location, isPublic } = req.body;

      const [updatedEvent] = await db.update(eventsTable)
         .set({ title, description, date, location, isPublic })
         .where(eq(eventsTable.id, id))
         .returning();

      if (!updatedEvent) {
         res.status(404).json({
            success: false,
            message: "Event not found",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "Event updated successfully",
         event: updatedEvent,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;

      const [deletedEvent] = await db.update(eventsTable)
         .set({ isDeleted: 'Y', deletedAt: new Date() })
         .where(eq(eventsTable.id, id))
         .returning();

      if (!deletedEvent) {
         res.status(404).json({
            success: false,
            message: "Event not found",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "Event deleted successfully",
         event: deletedEvent,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};
