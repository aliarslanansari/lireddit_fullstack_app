import nodemailer from "nodemailer"

export async function sendMail(to: string, html: string) {
  //   let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "n6zkcb5yhxr2lsor@ethereal.email",
      pass: "4SfS3Euv9pxt2wSXXF",
    },
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: to,
    subject: "Change Password,",
    html,
  })

  console.log("Message sent: %s", info.messageId)

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
