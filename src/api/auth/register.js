import api from "../mainInstance/main"

const registerUser = async (user) => {

    const res = await api.post('/auth/register', user)

    if (res.status === 201) {
        return 'User Created successfully'
    }

    return 'Somthing went wrong , try later'

}


export default registerUser