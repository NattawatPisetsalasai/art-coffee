import nodeMailer from 'nodemailer';

const nodeMailerFunc = {};

nodeMailerFunc.sendEmailWithGmailOAuth2 = async ({
  from,
  to,
  subject,
  html
}) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: from || process.env.GMAIL_ADDRESS,
      serviceClient: process.env.GMAIL_CLIENT_ID,
      privateKey: process.env.GMAIL_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  });

  const mailOptions = {
    from, to, subject, html
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw err;
    } else {
      return {
        from,
        to,
        subject,
        info
      };
    }
  });
};

export default nodeMailerFunc;

// sendEmailWithGmailOAuth2(
//   'vathunyoo@playtorium.co.th',
//   'admin@playtorium.co.th',
//   'Sending Email using Node.js (1)',
//   'That was easy! (1)'
// );
// sendEmailWithGmailOAuth2(
//   'rawissada@playtorium.co.th',
//   'admin@playtorium.co.th',
//   'Sending Email using Node.js (2)',
//   'That was easy! (2)'
// );