import { checkUser } from "@/utils/auth/checkUser"

export async function PATCH(req) {

    try {

        const { newName } = await req.json()
        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        user.name = newName
        await user.save()

        return Response.json({ msg: 'Name Changed successfully' }, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })

    }

}