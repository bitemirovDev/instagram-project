const nodemailer = require('nodemailer');

// Создайте транспорт для отправки писем через Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bitemirov.dev@gmail.com', // замените на вашу почту Gmail
    pass: 'mqzfyhqdrtcdkwla' // замените на ваш пароль Gmail
  }
});

// Функция для отправки электронного сообщения
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'bitemirov.dev@gmail.com', // замените на вашу почту Gmail
    to: to,
    subject: subject,
    text: text
  };

  // Отправка электронного сообщения
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
