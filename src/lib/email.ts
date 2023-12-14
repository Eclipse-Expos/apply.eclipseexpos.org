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
  const msg = {
    to: email,
    from: "aditya.makkar@eclipseexpos.org" as string,
    subject: subject,
    text: body,
    html: body,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error); // log any errors
  }
}
