import todoModel from "@/models/todo";
import { checkUser } from "@/utils/checkUser";
import dbConnect from "@/utils/database/dbConnect";

export async function DELETE(request, { params }) {


    try {

        const user = await checkUser()

        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id, taskID } = await params

        await dbConnect()

        await todoModel.updateOne(
            { _id: id, userID: user._id },
            { $pull: { tasks: { _id: taskID } } }
        )

        return new Response(JSON.stringify({ message: 'task deleted successfully' }), {
            status: 200
        });


    } catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ message: 'Server Error' }), {
            status: 500
        })
    }

}


export async function PATCH(request, { params }) {
    try {

        const { type, body } = await request.json()

        const user = await checkUser()

        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id, taskID } = await params

        await dbConnect()

        const todo = await todoModel.findOne({ _id: id, userID: user._id })
        const targetTask = todo.tasks.find(task => String(task._id) === String(taskID))

        if (type === 'status') {

            targetTask.isDone = !targetTask.isDone

            todo.save()

            return new Response(JSON.stringify({ message: 'Task status updated successfully' }), {
                status: 200
            });

        }

        targetTask.title = body

        todo.save()

        return new Response(JSON.stringify({ message: 'Task title updated successfully' }), {
            status: 200
        });


    } catch (err) {
        console.log('Error =>', err);
        return new Response(JSON.stringify({ message: 'Server Error' }), {
            status: 500
        })
    }
}