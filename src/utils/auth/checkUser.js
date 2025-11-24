import dbConnect from "../database/dbConnect";
import { generateToken, verifyRefreshToken, verifyToken } from "./token";
import { readtokens } from "./readtokens";
import userModel from "@/models/user";
import { serialize } from "cookie";


const notWantedFields = "-password -__v -refreshToken -recoveryCode -expTime -tryTimes -recoveryCooldown"

export const checkUser = async () => {

    await dbConnect();
    const { token, refreshToken } = await readtokens()

    const tokenPayload = token ? verifyToken(token) : null

    if (!tokenPayload) {

        const refreshTokenPayload = refreshToken ? verifyRefreshToken(refreshToken) : null

        if (!refreshTokenPayload) {
            return { user: null, response: Response.json({ msg: 'unauthorized' }, { status: 401 }) }
        }

        const user = await userModel.findOne({ refreshToken: refreshToken, email: refreshTokenPayload.email }, notWantedFields)

        if (!user) {
            return { user: null, response: Response.json({ msg: 'user not found' }, { status: 404 }) }
        }

        const newAccessToken = generateToken({ email: user.email })
        const serializedCookie = serialize("token", newAccessToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 10,
            secure: true,
            sameSite: "lax",
        })

        return { user: user, response: Response.json(user, { status: 200, headers: { "Set-Cookie": serializedCookie } }) }

    }

    const user = await userModel.findOne({ email: tokenPayload.email }, notWantedFields)

    if (!user) {
        return { user: null, response: Response.json({ msg: 'user not found' }, { status: 404 }) }
    }

    return { user: user, response: Response.json(user, { status: 200 }) }

}