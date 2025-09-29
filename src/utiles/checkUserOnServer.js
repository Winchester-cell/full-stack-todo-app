// import { cookies } from "next/headers";
// import { verifyToken } from "./auth/token";

// const checkuserOnServerSide = async () => {
//     const cookieStore = await cookies()
//     const token = cookieStore.get('token')?.value

//     if (!token) {
//         return false
//     }

//     const tokenPayload = verifyToken(token)

//     if (!tokenPayload) {
//         return false
//     }

//     return true

// }

// export default checkuserOnServerSide



import { cookies } from "next/headers";
import { verifyToken, verifyRefreshToken, generateToken } from "./auth/token";
import userModel from "@/models/user";
import dbConnect from "./database/dbConnect";
import { serialize } from "cookie";

const checkUserOnServerSide = async () => {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!token && !refreshToken) return false;

    const tokenPayload = token ? verifyToken(token) : null;
    if (tokenPayload) return true;


    if (refreshToken) {
        const refreshPayload = verifyRefreshToken(refreshToken);
        if (!refreshPayload) return false;

        const user = await userModel.findOne({ refreshToken: refreshToken });
        if (!user) return false;

        return true;
    }

    return false;
};

export default checkUserOnServerSide;
