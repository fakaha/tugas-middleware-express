import express from "express";
import { single, multiple } from "../middlewares/upload.middleware";
import { handleUpload } from "../utils/cloudinary";

const router = express.Router();

router.post("/upload/single", single, async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("File not received");
    }
    console.log(req.file);
    
    const result = await handleUpload(file?.buffer);
    res.status(200).json({
      message: "Success",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});
// router.get("/upload/multiple", multiple, (req, res) => {});

export default router;
