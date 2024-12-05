import { Request, Response } from 'express';
import { db } from '../config/db';
import { eventRegistrationsTable, eventsTable } from '../schemas';
import { and, eq } from 'drizzle-orm';

export const registerForEvent = async (req: Request, res: Response): Promise<void> => {
   try {
      const { eventId } = req.body;

      if (!eventId) {
         res.status(400).json({
            success: false,
            message: "User ID and Event ID are required",
         });
         return;
      }

      const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, eventId));
      if (!event) {
         res.status(404).json({
            success: false,
            message: "Event not found",
         });
         return;
      }

      const existingRegistration = await db.select()
         .from(eventRegistrationsTable)
         .where(and(eq(eventRegistrationsTable.userId, req.user?.id), eq(eventRegistrationsTable.eventId, eventId)))
         .limit(1);

      if (existingRegistration.length > 0) {
         res.status(409).json({
            success: false,
            message: "User is already registered for this event",
         });
         return;
      }

      const [registration] = await db.insert(eventRegistrationsTable)
         .values({ userId: req.user?.id, eventId })
         .returning();

      res.status(201).json({
         success: true,
         message: "User registered for the event successfully",
         registration,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const getRegistrationsForEvent = async (req: Request, res: Response): Promise<void> => {
   try {
      const { eventId } = req.params;

      if (!eventId) {
         res.status(400).json({
            success: false,
            message: "Event ID is required",
         });
         return;
      }

      const registrations = await db.select()
         .from(eventRegistrationsTable)
         .where(eq(eventRegistrationsTable.eventId, eventId));

      res.status(200).json({
         success: true,
         registrations,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const unregisterFromEvent = async (req: Request, res: Response): Promise<void> => {
   try {
      const { eventId } = req.body;

      if (!eventId) {
         res.status(400).json({
            success: false,
            message: "User ID and Event ID are required",
         });
         return;
      }

      const [deletedRegistration] = await db.delete(eventRegistrationsTable)
         .where(and(eq(eventRegistrationsTable.userId, req.user?.id), eq(eventRegistrationsTable.eventId, eventId)))
         .returning();

      if (!deletedRegistration) {
         res.status(404).json({
            success: false,
            message: "Registration not found",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "User unregistered from the event successfully",
         registration: deletedRegistration,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};
