import dotenv from 'dotenv';
dotenv.config();

import  type { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3001;

// Rest of your code remains the same...

app.use(cors());
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});