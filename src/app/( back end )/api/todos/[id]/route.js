import todoModel from "@/models/todo"
import checkuserOnServerSide from "@/utils/checkUserOnServer";

export async function PATCH(req, { params }) {


    try {

        const isUserLoggedIn = await checkuserOnServerSide()

        if (!isUserLoggedIn) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = await params

        const newTodo = await req.json()

        if (!newTodo || typeof newTodo !== "object") {
            return new Response(JSON.stringify({ error: "Invalid todo data" }), {
                status: 400,
            });
        }

        const todo = await todoModel.findOne({ _id: id })

        if (!todo) {
            return new Response(JSON.stringify({ error: "Todo not found" }), {
                status: 404,
            });
        }

        todo.tasks.push(newTodo)

        await todo.save()

        return new Response(JSON.stringify(todo), {
            status: 200
        })
    }

    catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ message: 'Server ErrorF' }), {
            status: 500
        })

    }



}

export async function GET(req, { params }) {


    try {

        const isUserLoggedIn = await checkuserOnServerSide()

        if (!isUserLoggedIn) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = await params

        const todo = await todoModel.findOne({ _id: id })

        return new Response(JSON.stringify(todo), {
            status: 200
        })
    }

    catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ message: 'Server ErrorF' }), {
            status: 500
        })

    }



}

export async function DELETE(req, { params }) {


    try {

        const isUserLoggedIn = await checkuserOnServerSide()

        if (!isUserLoggedIn) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = await params

        const result = await todoModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ message: 'Not found' }), {
                status: 404
            });
        }

        return new Response(JSON.stringify({ message: 'Deleted successfully' }), {
            status: 200
        })
    }

    catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ message: 'Server Error' }), {
            status: 500
        })

    }



}