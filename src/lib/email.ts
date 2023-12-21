import sgMail from "@sendgrid/mail";

/*
 * Send an email to the given email address
 * @param email The email to send to
 * @param subject The subject of the email
 * @param body The body of the email
 */
export async function sendEmail(email: string, subject: string, body: string) {
  // set the api key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  // message to send
  const msg: sgMail.MailDataRequired = {
    to: email,
    from: {
      email: process.env.SENDGRID_SENDER_ID as string,
      name: "Eclipse Expos (No Reply)",
    },
    subject: subject,
    text: body,
    html: body,
  };

  try {
    await sgMail.send(msg);
  } catch (error: any) {
    console.error(error); // log any errors
    console.error(error.response.body); // log the response body
  }
}
