import userModel from "@/models/user";
import todoModel from "@/models/todo";
import { verifyToken } from "@/utiles/auth/token";
import dbConnect from "./database/dbConnect";
import { cookies } from "next/headers";

export async function checkUser() {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return false
    }

    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
        return false
    }

    await dbConnect()

    const user = await userModel.findOne({ email: tokenPayload.email }, '-password -__v').populate('todos')

    if (!user) {
        return false
    }


    return user 

}