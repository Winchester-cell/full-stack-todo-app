import api from "../mainInstance/main"

export const deleteTodoTask = async (id, taskID) => {
    try {

        const res = await api.delete(`/todos/${id}/${taskID}`)

        if (res.status === 200) {

            return 'Task deleted successfully'

        }
        
        return 'Something went wrong'

    } catch (err) {

        return 'Something went wrong'

    }
}