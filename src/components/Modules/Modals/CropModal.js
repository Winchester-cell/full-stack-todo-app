'use client'
import Cropper from 'react-easy-crop'
import { useEffect, useState } from 'react'
import getCroppedImg from '@/utiles/others/getCroppedImg'
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import { useUploadImageStore } from '@/store/useUploadImageStore';
import updateAvatar from '@/api/user/updateAvatar';
import { uploadImage } from '@/utiles/others/uploadcare';
import { useToast } from '@/context/ToastContext';
import { useQueryClient } from '@tanstack/react-query';

export default function CropImageModal() {

    const { setShowCropper, setSelectedFile, selectedFile } = useUploadImageStore()
    const { showToast } = useToast()
    const [imageUrl, setImageUrl] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const queryClient = useQueryClient();

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageUrl(reader.result) // Base64 میده
            }
            reader.readAsDataURL(selectedFile) // همیشه جواب میده حتی روی Android
        }
    }, [selectedFile])

    const onCropDone = async () => {
        try {
            const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels)
            const url = await uploadImage(croppedBlob)
            const res = await updateAvatar(url)
            if (res.isOk) {
                queryClient.invalidateQueries({ queryKey: ['user'] });
                setTimeout(() => {
                    showToast(res.result, 'success')
                }, 2000);
            } else {
                setInterval(() => {
                    showToast(res.result, 'error')
                }, 2000);
            }
            setShowCropper(false)
        } catch (err) {
            console.error('Error cropping image:', err)
        }
    }

    const handleCancel = () => {
        setShowCropper(false)
        setSelectedFile(null)
    }


    return (

        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="p-4 rounded shadow-lg w-[90%] max-w-xl">

                <div className="relative w-full h-[500px] rounded-xl bg-[var(--colorB)]">
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // 1:1
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, croppedPixels) =>
                            setCroppedAreaPixels(croppedPixels)
                        }
                    />

                    <div className="absolute hidden md:flex items-center gap-2 bottom-4 right-4 bg-[var(--colorA)]  p-2 rounded-full">
                        <MdZoomOut className='w-6 h-6' />
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-24 block"
                        />
                        <MdZoomIn className='w-6 h-6' />

                    </div>

                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <button
                            onClick={onCropDone}
                            className="bg-[var(--colorA)] text-[var(--colorText)] px-5 py-2 rounded-full"
                        >
                            Save
                        </button>
                    </div>

                </div>

                <button onClick={handleCancel} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full">
                    Cancel
                </button>

            </div>
        </div>


    )
}
