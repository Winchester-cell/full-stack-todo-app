import { UploadClient } from "@uploadcare/upload-client";

const client = new UploadClient({ publicKey: process.env.UploadCare_Key })

export const uploadImage = async (file) => {
    const result = await client.uploadFile(file)
    return result.cdnUrl 
}