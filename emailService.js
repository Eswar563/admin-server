const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'evv.pedagadi365@gmail.com',
    pass: 'hbesptsbwfcjliri'
  }
});

function sendEmail(subject, text, to) {
  const mailOptions = {
    from: 'evv.pedagadi365@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = {
  sendEmail
};
