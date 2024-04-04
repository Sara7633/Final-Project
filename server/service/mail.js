const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
      user: '37214346710@mby.co.il',
      pass: 'Student@264'
  }
});

function sendEmail(to, body) {
  const mailOptions = {
      from: ' <37214346710@mby.co.il>',
      to: to,
      subject: "hello ",
      text: body
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail
};
