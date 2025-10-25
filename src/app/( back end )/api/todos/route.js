import todoModel from "@/models/todo";
import checkuserOnServerSide from "@/utils/checkUserOnServer"

export async function GET() {

    const isUserLoggedIn = await checkuserOnServerSide()

    if (!isUserLoggedIn) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const todos = await todoModel.find()

    return new Response(JSON.stringify(todos), {
        status: 200
    })

}

export async function POST(req) {

    const todo = await req.json()
    const isUserLoggedIn = await checkuserOnServerSide()

    if (!isUserLoggedIn) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    await todoModel.create(todo)

    return new Response(JSON.stringify({ message: 'Done' }), {
        status: 201
    })
}