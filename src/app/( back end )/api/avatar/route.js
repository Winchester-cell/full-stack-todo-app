import { checkUser } from "@/utiles/checkUser";
import dbConnect from "@/utiles/database/dbConnect";

export async function PATCH(req) {

    await dbConnect()

    const {avatar} = await req.json()

    const user = await checkUser()

    if (!user) {
        return new Response(JSON.stringify({ text: 'user not found' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        })

    }

    user.avatar = avatar;

    await user.save();


    return new Response(JSON.stringify({ text: 'avatar updated succesfully' }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })

}