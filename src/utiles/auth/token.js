import { sign, verify } from "jsonwebtoken"

const generateToken = (data) => {
    const token = sign({ ...data }, process.env.PrivateKey, {
        expiresIn: '24h'
    })
    return token
}

const verifyToken = (token) => {
    try {
        const verifyResult = verify(token, process.env.PrivateKey)
        return verifyResult
    } catch (err) {
        console.log('token Error =>', err)
        return null
    }
}

export { generateToken, verifyToken }