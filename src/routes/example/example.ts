import express, { Request, Response } from "express";

const router = express.Router();

router.get("/examplePath", async (req: Request, res: Response) => {
  const resp = {
    success: true,
  };

  res.json(resp);
});

export { router as exampleRoute };
