import todoModel from "@/models/todo";
import { checkUser } from "@/utils/auth/checkUser";
import { escapeRegex } from "@/utils/others/escapeRegex";

export async function GET(req) {

    try {

        const { user, response } = await checkUser()

        if (!user) {
            return response
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

        return Response.json({ todos: todos, totalPages: totalPages }, { status: 200 })

    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }

}

export async function POST(req) {

    try {
        const todo = await req.json()
        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        await todoModel.create(todo)

        return Response.json({ message: 'Done' }, { status: 201 })

    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }

}

export async function PATCH(req) {

    try {

        const { todoID, newTitle } = await req.json()
        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        const targetTodo = await todoModel.findOne({ _id: todoID, userID: user._id })

        if (!targetTodo) {
            return Response.json({ error: "not found" }, { status: 404 });
        }

        targetTodo.title = newTitle
        await targetTodo.save()

        return Response.json({ msg: 'Title updated successfully' }, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })

    }

}