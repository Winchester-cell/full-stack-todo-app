import { UploadClient } from "@uploadcare/upload-client";

const client = new UploadClient({ publicKey: '4b44d91c700c740c2e1e' })

export const uploadImage = async (file) => {
    const result = await client.uploadFile(file)
    return result.cdnUrl 
}