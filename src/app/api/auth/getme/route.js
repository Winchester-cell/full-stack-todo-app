import userModel from "@/models/user";
import { verifyToken } from "@/utiles/auth/token";
import dbConnect from "@/utiles/database/dbConnect";
import { cookies } from "next/headers";

export async function GET(req) {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
            status: 403,
        });
    }

    await dbConnect()

    const user = await userModel.findOne({ email: tokenPayload.email }, '-password -_id -__v')

    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
        });
    }


    return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })

}