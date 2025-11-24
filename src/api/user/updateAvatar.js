import api from "../mainInstance/main";

const updateAvatar = async (formData) => {
    try {
        const res = await api.patch('/avatar', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        if (res.status === 200) {
            return { isOk: true, result: 'Avatar Updated successfully' }
        }
    } catch (err) {
        console.log('Error =>', err);
        return { isOk: false, result: 'something went wrong' }
    }
}

export default updateAvatar