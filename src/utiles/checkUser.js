import userModel from "@/models/user";
import { verifyRefreshToken, verifyToken } from "@/utiles/auth/token";
import dbConnect from "./database/dbConnect";
import { cookies } from "next/headers";

export async function checkUser() {

    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!token && !refreshToken) return false;

    const tokenPayload = token ? verifyToken(token) : null;
    if (tokenPayload) {
        const user = await userModel.findOne(
            { email: tokenPayload.email },
            "-password -__v"
        );
        return user || false;
    }

    if (refreshToken) {
        const refreshPayload = verifyRefreshToken(refreshToken);
        if (!refreshPayload) return false;

        const user = await userModel.findOne(
            { refreshToken },
            "-password -__v"
        );
        return user || false;
    }

    return false;
}
