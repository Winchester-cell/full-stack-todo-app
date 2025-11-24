import { cookies } from "next/headers";

export const readtokens = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    return { token, refreshToken }

}