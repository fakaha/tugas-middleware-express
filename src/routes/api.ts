import express from "express";

import { single, multiple } from "../middlewares/upload.middleware";
import { handleUpload } from "../utils/cloudinary";

const router = express.Router();

router.post("/upload/single", single, async(req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("File not received");
  }
  const result = await handleUpload(file.buffer)
  
  return res.status(200).json({
    message: 'Success'
  })
});
// router.get("/upload/multiple", multiple, (req, res) => {});

export default router;
