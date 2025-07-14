import { cookies } from "next/headers";
import { verifyToken } from "./auth/token";

const checkuserOnServerSide = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return false
    }

    const tokenPayload = verifyToken(token)

    if (!tokenPayload) {
        return false
    }

    return true

}

export default checkuserOnServerSide
