import { Request, Response } from "express";
import { db } from "../config/db";
import { jobsTable } from "../schemas";
import { eq, and } from "drizzle-orm";

export const createJob = async (req: Request, res: Response): Promise<void> => {
   try {
      const { title, description, company, location, salary, applicationLink } = req.body;
      const alumniId = req.user?.id;

      if (!title || !description || !company || !alumniId) {
         res.status(400).json({
            success: false,
            message: "Title, description, company, and alumniId are required.",
         });
         return;
      }

      const [newJob] = await db.insert(jobsTable).values({
         title,
         description,
         company,
         location,
         salary,
         applicationLink,
         alumniId,
      }).returning();

      res.status(201).json({
         success: true,
         message: "Job created successfully.",
         job: newJob,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const getAllJobs = async (_req: Request, res: Response): Promise<void> => {
   try {
      const jobs = await db.select().from(jobsTable).where(eq(jobsTable.isDeleted, "N"));

      res.status(200).json({
         success: true,
         jobs,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const [job] = await db.select().from(jobsTable).where(and(eq(jobsTable.id, id), eq(jobsTable.isDeleted, 'N'))).limit(1);

      if (!job) {
         res.status(404).json({
            success: false,
            message: "Job not found.",
         });
         return;
      }

      res.status(200).json({
         success: true,
         job,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const updates = req.body;

      const [updatedJob] = await db.update(jobsTable).set(updates).where(and(eq(jobsTable.id, id), eq(jobsTable.isDeleted, 'N'))).returning();

      if (!updatedJob) {
         res.status(404).json({
            success: false,
            message: "Job not found or could not be updated.",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "Job updated successfully.",
         job: updatedJob,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;

      const [deletedJob] = await db.update(jobsTable).set({ isDeleted: "Y", deletedAt: new Date() }).where(eq(jobsTable.id, id)).returning();

      if (!deletedJob) {
         res.status(404).json({
            success: false,
            message: "Job not found or could not be deleted.",
         });
         return;
      }

      res.status(200).json({
         success: true,
         message: "Job deleted successfully.",
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
};
