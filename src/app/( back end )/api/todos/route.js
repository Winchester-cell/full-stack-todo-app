import todoModel from "@/models/todo";
import { checkUser } from "@/utils/checkUser";
import { escapeRegex } from "@/utils/others/escapeRegex";

export async function GET(req) {

    try {

        const user = await checkUser()

        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { searchParams } = new URL(req.url);
        const filter = searchParams.get("filter") || ''
        const safeFilter = escapeRegex(filter)
        let page = parseInt(searchParams.get("page")) || 1;
        const perPage = 15
        const total = await todoModel.countDocuments({ userID: user._id, title: { $regex: safeFilter, $options: "i" } });
        const totalPages = Math.ceil(total / perPage);

        if (page > totalPages && totalPages !== 0) {
            page = 1
        }

        const todos = await todoModel.find({ userID: user._id, title: { $regex: safeFilter, $options: "i" } }).skip((page - 1) * perPage).limit(perPage);

        return new Response(JSON.stringify({ todos: todos, totalPages: totalPages }), {
            status: 200
        })


    } catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ err: 'Server Error' }), {
            status: 500
        })
    }

}

export async function POST(req) {

    try {
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
    } catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ err: 'Server Error' }), {
            status: 500
        })
    }

}

export async function PATCH(req) {
    try {

        const { todoID, newTitle } = await req.json()
        const user = await checkUser()

        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const targetTodo = await todoModel.findOne({ _id: todoID, userID: user._id })

        if (!targetTodo) {
            return new Response(JSON.stringify({ error: "nothing found" }), {
                status: 404,
            });
        }

        targetTodo.title = newTitle
        await targetTodo.save()

        return new Response(JSON.stringify({ msg: 'Title updated successfully' }), { status: 200 })

    } catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ err: 'Server Error' }), {
            status: 500
        })
    }
}