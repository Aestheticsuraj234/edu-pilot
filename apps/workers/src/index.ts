import dotenv from 'dotenv';
dotenv.config();

import  type { Request, Response, NextFunction } from 'express';
import express from 'express';


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});