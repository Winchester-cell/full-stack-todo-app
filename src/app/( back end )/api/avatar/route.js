import { checkUser } from "@/utils/auth/checkUser";

export async function PATCH(req) {

    try {

        const { avatar } = await req.json()

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        user.avatar = avatar;

        await user.save();

        return Response.json({ text: 'avatar updated succesfully' }, { status: 200 })

    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }


}