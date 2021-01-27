import sgMail from '@sendgrid/mail';

export const sendForgetPasswordEmail = (email: string, token: string) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);

  const msg = {
    to: email, // Change to your recipient
    from: 'neupanebishal07@gmail.com', // Change to your verified sender
    subject: 'Account forget password',
    text: 'This is an account reset request made probably by in app sing&share',
    html: `<div>
    <h1>Reset your password</h1>
    <a href='http://localhost:3000/change-password?token=${token}'>
    Click here to reset your password</a>
    <h2>Hurry up it won't last long!!</h2></div>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};
