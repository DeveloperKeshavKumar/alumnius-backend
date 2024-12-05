import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { db } from "../config/db";
import { usersTable } from "../schemas";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
   try {
      const { password, email, name, role } = req.body;

      if (!email || !password || !name ) {
         res.status(400).json({
            success: false,
            message: "Email, name and password are required",
         });
         return;
      }

      const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

      if (existingUser.length > 0) {
         res.status(409).json({
            success: false,
            message: "Email already exists",
         });
         return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const [response] = await db.insert(usersTable).values({ name, role, email, password: hashedPassword }).returning();
      const userResponse = { ...response, password: undefined };

      res.status(201).json({
         success: true,
         message: "User registered successfully",
         user: userResponse,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         res.status(400).json({
            success: false,
            message: "Email and password are required",
         });
         return;
      }

      const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

      if (existingUser.length === 0) {
         res.status(401).json({
            success: false,
            message: "User doesn't exist",
         });
         return;
      }

      const user = existingUser[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         res.status(401).json({
            success: false,
            message: "Either email or password is incorrect",
         });
         return;
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
         throw new Error("JWT_SECRET is not defined in the environment variables.");
      }
      const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '12h' });

      res.status(200).json({
         success: true,
         message: "Login successful",
         user: {
            id: user.id,
            email: user.email,
            token
         },
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error: error.message,
      });
   }
}