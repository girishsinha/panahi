import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface CloudinaryUploadResponse {
  url: string;
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<CloudinaryUploadResponse | null> => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath); // cleanup local file
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // cleanup on failure
    }
    console.error('Cloudinary upload failed:', error);
    return null;
  }
};

export { uploadOnCloudinary };