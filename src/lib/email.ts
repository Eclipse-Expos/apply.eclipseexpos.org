import sgMail from "@sendgrid/mail";
import crypto from "crypto";

/*
 * Send an email to the given email address
 * @param email The email to send to
 * @param subject The subject of the email
 * @param body The body of the email
 */
export async function sendEmail(
  email: string,
  subject: string,
  body: string,
  html?: string,
) {
  // set the api key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  // message to send
  const msg: sgMail.MailDataRequired = {
    to: email,
    from: {
      email: process.env.SENDGRID_SENDER_ID as string,
      name: "Eclipse Expos",
    },
    subject: subject,
    text: body,
    html: html ? html : body,
    headers: {
      "In-Reply-To": crypto.randomUUID(),
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error: any) {
    console.error(error); // log any errors
    console.error(error.response.body); // log the response body
  }
}
