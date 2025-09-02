import dotenv from 'dotenv';
dotenv.config();

import  type { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.all("/api/auth/*", toNodeHandler(auth)); 

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});