import { checkUser } from "@/utils/auth/checkUser";
import { uploadImage } from "@/utils/others/uploadcare";

export async function PATCH(req) {

    try {

        const formData = await req.formData()
        const file = formData.get("avatar")

        if (!file) {
            return Response.json({ err: "No file received" }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const cdnUrl = await uploadImage(buffer)

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        user.avatar = cdnUrl;

        await user.save();

        return Response.json({ text: 'avatar updated succesfully' }, { status: 200 })

    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }

}

export async function DELETE() {

    try {

        const { user, response } = await checkUser()

        if (!user) return response

        const fileID = user.avatar.split("ucarecdn.com/")[1].split("/")[0]

        if (!fileID) {
            return Response.json({ msg: 'No avatar link found' }, { status: 404 })
        }

        const res = await fetch(`https://api.uploadcare.com/files/${fileID}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Uploadcare.Simple ${process.env.UploadCare_Key}:${process.env.UploadCare_Secret_Key}`,
                "Accept": "application/json",
            },
        })

        if (res.ok) {
            user.avatar = null
            await user.save()
            return Response.json({ msg: 'Avatar removed successfully' }, { status: 200 })
        }

        return Response.json({ msg: 'Failed' }, { status: 400 })

    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }
    
}