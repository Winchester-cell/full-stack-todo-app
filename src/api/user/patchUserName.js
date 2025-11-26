import api from "../mainInstance/main"

export const patchUserName = async (newName) => {
    try {
        const res = await api.patch('/user', { newName })
        if (res.status === 200) {
            return { isOk: true, result: 'Name updated successfully' }
        }
    } catch (err) {
        return { isOk: false, result: 'something went wrong' }
    }
}