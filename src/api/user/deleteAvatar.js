import api from "../mainInstance/main";

const deleteAvatar = async () => {
    try {
        const res = await api.delete('/avatar')
        if (res.status === 200) {
            return { isOk: true, result: 'Avatar deleted successfully' }
        }
    } catch (err) {
        console.log('Error =>', err);
        return { isOk: false, result: 'Something went wrong' }
    }
}

export default deleteAvatar