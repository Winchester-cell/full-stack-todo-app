import axios from "axios"

const registerUser = async (user) => {

    const res = await axios.post('/api/auth/register', user)

    if (res.status === 201) {
        return 'User Created successfully'
    }

    return 'Somthing went wrong , try later'

}


export default registerUser