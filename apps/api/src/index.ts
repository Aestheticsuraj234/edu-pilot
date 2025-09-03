import dotenv from 'dotenv';
dotenv.config();

import  type { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '@/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:3000"], // frontend
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*splat", cors()); // handle preflight requests


app.use(helmet());

app.all("/api/auth/*splat", toNodeHandler(auth)); 

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});