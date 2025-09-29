import { sign, verify } from "jsonwebtoken"

export const generateToken = (data) => {
    const token = sign({ ...data }, process.env.PrivateKey, {
        expiresIn: '5s'
    })
    return token
}

export const verifyToken = (token) => {
    try {
        const verifyResult = verify(token, process.env.PrivateKey)
        return verifyResult
    } catch (err) {
        console.log('token Error =>', err)
        return null
    }
}

export const generateRefreshToken = (data) => {
    const token = sign({ ...data }, process.env.RefreshTokenPrivateKey, {
        expiresIn: '7d'
    })
    return token
}


export const verifyRefreshToken = (token) => {
    try {
        const verifyResult = verify(token, process.env.RefreshTokenPrivateKey)
        return verifyResult
    } catch (err) {
        console.log('token Error =>', err)
        return null
    }
}


