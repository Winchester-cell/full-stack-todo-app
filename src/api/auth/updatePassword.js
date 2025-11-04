import api from "../mainInstance/main"

const updatePassword = async (userEmail, newPassword, code) => {
    try {
        const res = await api.post('/auth/verifyrecoverycode', { code, userEmail, newPassword })

        if (res.status === 201) {
            return { result: 'Password Changed Successfully', isOk: true }
        }

        return { result: 'Something went wrong, try later', isOk: false }

    } catch (err) {
        return { result: 'Something went wrong, try later', isOk: false }
    }
}

export default updatePassword
