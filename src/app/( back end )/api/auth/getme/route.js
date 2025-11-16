import userModel from "@/models/user";
import todoModel from "@/models/todo";
import { generateToken, verifyRefreshToken, verifyToken } from "@/utils/auth/token";
import dbConnect from "@/utils/database/dbConnect";
import { cookies } from "next/headers";
import { serialize } from "cookie";


export async function GET() {

    try {

        await dbConnect()

        const cookieStore = await cookies()

        const token = cookieStore.get('token')?.value
        const refreshToken = cookieStore.get('refreshToken')?.value

        const tokenPayload = token ? verifyToken(token) : null

        if (!tokenPayload) {

            if (!refreshToken) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), {
                    status: 401,
                });
            }

            const refreshTokenPayload = verifyRefreshToken(refreshToken)

            if (!refreshTokenPayload) {
                return new Response(JSON.stringify({ error: "Invalid token" }), {
                    status: 403,
                });
            }

            const user = await userModel.findOne({ refreshToken: refreshToken }, '-password -__v -refreshToken -expTime -recoveryCode -tryTimes').populate('todos')

            if (!user) {
                return new Response(JSON.stringify({ msg: 'user not found' }), { status: 404 })
            }

            const newToken = generateToken({ email: user.email })

            const serializedCookie = serialize("token", newToken, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 10,
                secure: true,
                sameSite: "lax",
            });

            return new Response(JSON.stringify(user), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": serializedCookie

                },
            })

        }

        const user = await userModel.findOne({ email: tokenPayload.email }, '-password -__v -refreshToken -expTime -recoveryCode -tryTimes')

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

    } catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 })
    }



}