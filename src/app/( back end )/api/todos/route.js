import todoModel from "@/models/todo";
import { checkUser } from "@/utils/checkUser";
import { escapeRegex } from "@/utils/others/escapeRegex";

export async function GET(req) {

    const user = await checkUser()

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter")
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = 15

    if (filter) {
        const safeFilter = escapeRegex(filter)
        const filteredTodos = await todoModel.find({
            title: { $regex: safeFilter, $options: "i" } 
        });
        return new Response(JSON.stringify(filteredTodos))
    }

    const total = await todoModel.countDocuments({ userID: user._id });
    const totalPages = Math.ceil(total / perPage);

    if (page > totalPages && totalPages !== 0) {
        return new Response(JSON.stringify({ error: "Page not found" }), {
            status: 400,
        });
    }

    const todos = await todoModel.find({ userID: user._id }).skip((page - 1) * perPage).limit(perPage);

    return new Response(JSON.stringify({ todos: todos, totalPages: totalPages }), {
        status: 200
    })

}

export async function POST(req) {

    const todo = await req.json()
    const user = await checkUser()

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    await todoModel.create(todo)

    return new Response(JSON.stringify({ message: 'Done' }), {
        status: 201
    })
}