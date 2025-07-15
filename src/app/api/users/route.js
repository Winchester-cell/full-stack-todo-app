import userModel from "@/models/user";
import dbConnect from "@/utiles/database/dbConnect";


export async function GET() {

    await dbConnect()

    const users = await userModel.find({})

    return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })

}