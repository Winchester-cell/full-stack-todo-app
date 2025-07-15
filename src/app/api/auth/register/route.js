import userModel from "@/models/user"
import { hashPassword } from "@/utiles/auth/password"
import { generateToken } from "@/utiles/auth/token"
import dbConnect from "@/utiles/database/dbConnect"
import { serialize } from "cookie"

export async function POST(req) {

    // connect to database

    await dbConnect()

    const { name, email, password } = await req.json()

    // checks if fields are empty and send reasonable response

    if (!name.trim() || !email.trim() || !password.trim()) {
        return new Response(JSON.stringify({ error: 'invalid info' }), {
            status: 422,
        })
    }

    // check if email is alreay exist and its response

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        return new Response(JSON.stringify({ error: 'user already exist' }), {
            status: 422,
        })
    }

    // finaly if everything is fine we can continue

    const hashedPassword = await hashPassword(password)

    await userModel.create({ name, email, password: hashedPassword })

    const token = generateToken({ email })

    const serializedCookie = serialize("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "lax",
    });

    return new Response(JSON.stringify({ message: 'user created' }), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
            "Set-Cookie": serializedCookie,
        }
    })

}