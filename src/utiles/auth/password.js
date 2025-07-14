import bcrypt from 'bcrypt'

const hashPassword = async (password) => {

    const hashedPassword = await bcrypt.hash(password, 12)

    return hashedPassword

}

const verifyPassword = async (hashedPassword, password) => {

    const isMatch = await bcrypt.compare(password, hashedPassword)

    return isMatch
}

export { hashPassword, verifyPassword }