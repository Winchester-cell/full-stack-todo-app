import todoModel from "@/models/todo"
import { checkUser } from "@/utils/auth/checkUser";

export async function PATCH(req, { params }) {

    try {

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        const { id } = await params

        const newTodo = await req.json()

        if (!newTodo || typeof newTodo !== "object") {
            return Response.json({ error: "Invalid todo data" }, { status: 400 })
        }

        const todo = await todoModel.findOne({ _id: id })

        if (!todo) {
            return Response.json({ msg: "Todo not found" }, { status: 404 })
        }

        todo.tasks.push(newTodo)

        await todo.save()

        return Response(todo, { status: 200 })

    }

    catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }

}

export async function GET(_, { params }) {

    try {

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        const { id } = await params

        const todo = await todoModel.findOne({ _id: id })

        return Response.json(todo, { status: 200 })

    }

    catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }

}

export async function DELETE(_, { params }) {

    try {

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        const { id } = await params

        const result = await todoModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return Response({ message: 'Not found' }, { status: 404 })
        }

        return Response.json({ message: 'Deleted successfully' }, { status: 200 })
    }

    catch (err) {
        console.log('Error =>', err);
        return Response.json({ err: 'Server Error' }, { status: 500 })
    }

}