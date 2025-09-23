import api from "../mainInstance/main"

const registerUser = async (user) => {

    try {
        const res = await api.post('/auth/register', user)

        if (res.status === 201) {
            return { isOk: true, result: 'User Created successfully' }
        }

        return { isOk: false, result: 'Somthing went wrong , try later' }

    } catch {
        return { isOk: false, result: 'Somthing went wrong , try later' }
    }



}


export default registerUser