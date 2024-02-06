import nodemailer from "nodemailer";

export const mailer = (email, optCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rramkatwal24@gmail.com",
      pass: "nlxg dzof yvmb scgl",
    },
  });

  const mailOptions = {
    from: '"Reset Password" <rramkatwal24@gmail.com>',
    to: email,
    subject: "Your OTP code",
    text: `Your 6 digit OTP code is: ${optCode}. `,
    html: `Your 6 digit OTP code is: ${optCode}. It expires after 3 minutes.`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};
