import express from "express";
import type { Request, Response, NextFunction } from "express";

const router: express.Router = express.Router();

router.post("/generate", async (req: Request, res: Request) => {
  try {
    const { prompt } = req.body;
  } catch (error) {}
});


router.get("/:id" , async (req: Request, res: Request) => {
    // get project details
})

router.get("/:id/status" , async (req: Request, res: Request) => {
    // get processing status
})

export default router;
