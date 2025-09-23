import api from "../mainInstance/main"

export const deleteTodo = async (id) => {
    try {
        const res = await api.delete(`/todos/${id}`)
        if (res.status === 200) {
            return { isOk: true, result: 'Deleted Successfully' }
        }
        return { isOk: false, result: 'Something went wrong' }
    } catch (err) {
        return { isOk: false, result: 'Something went wrong' }
    }
}