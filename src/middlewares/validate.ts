import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import _ from 'lodash';

export function validateData(schema: z.ZodObject<any, any>) {

   return (req: Request, res: Response, next: NextFunction) => {
      try {
         schema.parse(req.body);
         // Overwrite req.body with sanitized data
         req.body = _.pick(req.body, Object.keys(schema.shape));
         next();
      } catch (error: any) {
         if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
               message: `${issue.path.join('.')} >> ${issue.message}`,
            }));
            res.status(400).json({ error: 'Invalid data', details: errorMessages });
         } else {
            res.status(500).json({ error: 'Internal Server Error' });
         }
      }
   };
}