import userModel from "@/models/user";
import { verifyPassword } from "@/utiles/auth/password";
import { generateToken } from "@/utiles/auth/token";
import cookie from 'cookie'

const { default: dbConnect } = require("@/utiles/database/dbConnect");

export async function POST(req) {

    // connect to database

    await dbConnect()

    const { email, password } = await req.json()

    // checks if fields are empty and send reasonable response

    if (!email.trim() || !password.trim()) {
        return new Response(JSON.stringify({ error: 'email or password can not be empty' }), {
            status: 422,
        })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return new Response(JSON.stringify({ error: 'username or password is incorrect' }), {
            status: 422,
        })
    }

    const isPasswordValid = await verifyPassword(user.password, password)

    if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: 'username or password is incorrect' }), {
            status: 422,
        })
    }

    const token = generateToken({ email })

    return new Response(JSON.stringify({ message: 'Welcome' }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
            "Set-Cookie": cookie.serialize('token', token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24,
            })
        }
    })

}