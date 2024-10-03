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

router.post("/upload/multiple", multiple, async (req, res) => {
  try {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    if (files?.length == 0) {
      return res.status(400).send("File not received");
    }
    console.log(req.files);

    const results = await Promise.all(
      files?.map((file) => handleUpload(file.buffer))
    );

    // CARA KEDUA
    // const results = [];
    // for (const file of files) {
    //   const result = await handleUpload(file.buffer); // Tunggu setiap unggahan
    //   results.push(result); // Tambahkan hasil ke array
    //   console.log(result); // Proses setiap file satu per satu
    // }

    res.status(200).json({
      message: "Success",
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

export default router;
