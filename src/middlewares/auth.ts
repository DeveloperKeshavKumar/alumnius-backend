import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifytoken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
         return res.status(401).json({
            success: false,
            error: "Access denied. No token provided.",
         });
      }

      const token = authHeader;
      const secret = process.env.JWT_SECRET;
      if (!secret) {
         throw new Error('JWT_SECRET is not defined in the environment variables.');
      }
      const decoded = jwt.verify(token, secret);
      req.user = decoded as jwt.JwtPayload;

      next();
   } catch (error: any) {
      res.status(500).json({
         success: false,
         error: error,
      })
   }
}

export const verifyRole = (role: string) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         if (req.user?.role === role) {
            next()
         } else {
            res.status(401).json({
               success: false,
               error: "Role not matched for request"
            })
         }

      } catch (error) {
         res.status(500).json({
            success: false,
            error: error,
         })
      }
   }
}