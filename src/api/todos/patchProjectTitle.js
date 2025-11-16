import api from "../mainInstance/main"

export const patchProjectTitle = async (todoID, newTitle) => {
    try {
        const res = await api.patch(`/todos`, { todoID, newTitle })
        if (res.status === 200) {
            return { isOk: true, result: 'Project updated successfully' }
        }
        return { isOk: false, result: 'Something went wrong , try again' }
    } catch (err) {
        return { isOk: false, result: 'Something went wrong , try again' }
    }
}