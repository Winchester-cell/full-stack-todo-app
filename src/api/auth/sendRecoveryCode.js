import api from "../mainInstance/main"

const sendRecoveryCode = async (email) => {
    try {
        const res = await api.post('/auth/recovery', { userEmail: email })

        if (res.status === 201) {
            return { result: 'We’ve sent a security code to your email', isOk: true }
        }

        return { result: 'Something went wrong, try later', isOk: false }

    } catch (err) {
        return { result: 'Something went wrong, try later', isOk: false }
    }
}

export default sendRecoveryCode
