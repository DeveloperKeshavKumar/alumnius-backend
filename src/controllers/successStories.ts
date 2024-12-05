import { Request, Response } from "express";
import { db } from "../config/db";
import { successStoriesTable } from "../schemas";
import { and, eq } from "drizzle-orm";

export const createSuccessStory = async (req: Request, res: Response): Promise<void> => {
   try {
      const { title, story } = req.body;
      const alumniId = req.user?.id;

      if (!title || !story || !alumniId) {
         res.status(400).json({
            success: false,
            message: "Title, story, and alumniId are required.",
         });
         return;
      }

      const [newStory] = await db.insert(successStoriesTable).values({
         title,
         story,
         alumniId,
      }).returning();

      res.status(201).json({
         success: true,
         message: "Success story created successfully.",
         story: newStory,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const getAllSuccessStories = async (_req: Request, res: Response): Promise<void> => {
   try {
      const stories = await db.select().from(successStoriesTable).where(eq(successStoriesTable.isDeleted, "N"));

      res.status(200).json({
         success: true,
         stories,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const getSuccessStoryById = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;

      const [story] = await db.select().from(successStoriesTable).where(and(eq(successStoriesTable.id, id), eq(successStoriesTable.isDeleted, 'N'))).limit(1);

      if (!story) {
         res.status(404).json({
            success: false,
            message: "Success story not found.",
         });
         return;
      }

      res.status(200).json({
         success: true,
         story,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const updateSuccessStory = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const updates = req.body;

      const [updatedStory] = await db.update(successStoriesTable).set(updates).where(and(eq(successStoriesTable.id, id), eq(successStoriesTable.isDeleted, 'N'))).returning();

      if (!updatedStory) {
         res.status(404).json({
            success: false,
            message: "Success story not found or could not be updated.",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "Success story updated successfully.",
         story: updatedStory,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const deleteSuccessStory = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;

      const [deletedStory] = await db.update(successStoriesTable).set({ isDeleted: "Y", deletedAt: new Date() }).where(eq(successStoriesTable.id, id)).returning();

      if (!deletedStory) {
         res.status(404).json({
            success: false,
            message: "Success story not found or could not be deleted.",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "Success story deleted successfully.",
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};
