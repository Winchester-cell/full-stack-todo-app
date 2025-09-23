import api from "../mainInstance/main"

export const patchTask = async (update, todoID, taskID) => {
    try {
        const res = await api.patch(`todos/${todoID}/${taskID}`, update)
        if (res.status === 200) {
            return { isOk: true, result: 'Updated successfully' }
        }
        return { isOk: false, result: 'Error' }
    } catch (err) {
        return { isOk: false, result: 'Error' }
    }
} 