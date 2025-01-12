"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const uploadImage = async (imageEncoded: string) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(imageEncoded);
    return secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
