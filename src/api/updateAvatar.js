const { default: axios } = require("axios");

const updateAvatar = async (url) => {
    try {
        const res = await axios.patch('/api/avatar', { avatar: url })
        if (res.status === 200) {
            return { isOk: true, result: 'Avatar Updated successfully' }
        }
    } catch (err) {
        console.log('Error =>', err);
        return { isOk: false, result: 'something went wrong' }
    }
}

export default updateAvatar