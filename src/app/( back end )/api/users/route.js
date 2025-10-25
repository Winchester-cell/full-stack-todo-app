import userModel from "@/models/user"
import dbConnect from "@/utils/database/dbConnect"

export async function GET() {

    await dbConnect()

    const users = await userModel.find().populate('todos')

    return new Response(JSON.stringify(users, null, 2), {
        status: 200
    })

}
