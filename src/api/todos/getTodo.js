import api from "../mainInstance/main"

export const getTodo = async (id) => {
    try {
        const res = await api.get(`/todos/${id}`)
        if (res.status === 200) {
            return res.data
        }
        return 'Something went wrong'
    } catch (err) {
        return 'Something went wrong'
    }
}