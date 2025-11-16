import api from "../mainInstance/main"

export const patchTodo = async (id, todo) => {
    try {
        const res = await api.patch(`/todos/${id}`, todo)
        if (res.status === 200) {
            return 'Todo updated successfully'
        }
        return 'Somthing went wrong'
    } catch (err) {
        return 'Somthing went wrong'
    }
}