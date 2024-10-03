import { v2 as cloudinary } from "cloudinary";
import {Readable} from 'stream'
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const handleUpload = async (file: Buffer) => {
  return new Promise((resolve, reject) => {
    const streamedFile = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    let str = Readable.from(file);
    str.pipe(streamedFile);
  });
};

export default cloudinary;
