import todoModel from "@/models/todo";
import { checkUser } from "@/utils/auth/checkUser";

export async function DELETE(_, { params }) {


    try {

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        const { id, taskID } = await params

        await todoModel.updateOne(
            { _id: id, userID: user._id },
            { $pull: { tasks: { _id: taskID } } }
        )

        return Response.json({ message: 'task deleted successfully' }, { status: 200 })


    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ error: 'Server Error' }, { status: 500 })
    }

}

export async function PATCH(request, { params }) {

    try {

        const { type, body } = await request.json()

        const { user, response } = await checkUser()

        if (!user) {
            return response
        }

        const { id, taskID } = await params

        const todo = await todoModel.findOne({ _id: id, userID: user._id })
        const targetTask = todo.tasks.find(task => String(task._id) === String(taskID))

        if (type === 'status') {

            targetTask.isDone = !targetTask.isDone

            todo.save()

            return Response.json({ message: 'Task status updated successfully' }, { status: 200 })

        }

        targetTask.title = body

        todo.save()

        return Response.json({ message: 'Task title updated successfully' }, { status: 200 })


    } catch (err) {
        console.log('Error =>', err);
        return Response.json({ error: 'Server Error' }, { status: 500 })
    }

}