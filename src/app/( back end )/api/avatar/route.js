import userModel from "@/models/user";
import { verifyToken } from "@/utiles/auth/token";
import dbConnect from "@/utiles/database/dbConnect";
import { cookies } from "next/headers";

export async function PATCH(req) {

    await dbConnect()

    const {avatar} = await req.json()

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        })
    }

    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
            status: 403,
        })
    }

    const user = await userModel.findOne({ email: tokenPayload.email })

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