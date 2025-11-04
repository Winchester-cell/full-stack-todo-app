import dbConnect from "@/utils/database/dbConnect";
import userModel from "@/models/user";
import { hashPassword, verifyPassword } from "@/utils/auth/password";

export async function POST(req) {

    await dbConnect()

    const { code, userEmail, newPassword } = await req.json()

    try {

        const user = await userModel.findOne({ email: userEmail })
        const now = Date.now()

        if (!user) {
            return Response.json({ msg: 'User not found' }, { status: 404 })
        }

        if (user.recoveryCooldown && user.recoveryCooldown >= now) {
            return Response.json({ msg: 'Too many attempts, please try again later' }, { status: 429 })
        }

        if (user.expTime <= now) {
            return Response.json({ msg: 'The code you entered has expired' }, { status: 410 })
        }

        const isCodeValid = await verifyPassword(user.recoveryCode, `${code}`)

        if (isCodeValid) {
            user.password = await hashPassword(newPassword)
            user.expTime = null
            user.recoveryCode = null
            user.tryTimes = null
            user.recoveryCooldown = null
            await user.save()
            return Response.json({ msg: 'passwordChanged successfully' }, { status: 201 })
        }

        user.tryTimes = user.tryTimes + 1

        if (user.tryTimes > 3) {
            user.recoveryCooldown = Date.now() + (1000 * 60 * 15)
        }

        await user.save()
        return Response.json({ msg: 'password recovery failed' }, { status: 400 })

    } catch (err) {

        console.error(err);
        return Response.json({ success: false, error: err.message });

    }
}
