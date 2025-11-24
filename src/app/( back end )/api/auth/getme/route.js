import { checkUser } from "@/utils/auth/checkUser";

export async function GET() {

    try {

        const { response } = await checkUser()
        return response

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ error: 'Server Error' }, { status: 500 })

    }



}