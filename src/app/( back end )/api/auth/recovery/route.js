import nodemailer from "nodemailer";
import userModel from "@/models/user";
import { hashPassword } from "@/utils/auth/password";
import dbConnect from "@/utils/database/dbConnect";

export async function POST(req) {

  await dbConnect()

  const { userEmail } = await req.json()

  try {

    const user = await userModel.findOne({ email: userEmail })

    if (!user) {
      return Response.json({ msg: 'User not found' }, { status: 404 })
    }

    const code = Math.floor(10000 + Math.random() * 90000);
    const expTime = Date.now() + (1000 * 60 * 3)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Next-Todo Password RecoverCode",
      text: `Hello ${user.name || ''},\n\nYour password recovery code is: ${code}\n\nThis code will expire in 3 minutes.`,
    };

    const hashedPassword = await hashPassword(`${code}`)

    user.recoveryCode = hashedPassword
    user.expTime = expTime

    user.tryTimes = user.tryTimes || 0
 
    await user.save()

    const info = await transporter.sendMail(mailOptions);

    return Response.json({ success: true, info: info.response }, { status: 201 });

  } catch (err) {

    console.error(err);
    return Response.json({ success: false, error: "Server Error" }, { status: 500 });

  }
}
