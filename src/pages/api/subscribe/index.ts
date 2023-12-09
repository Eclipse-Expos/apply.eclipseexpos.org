import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@/lib/prisma";
import { type User } from "@/lib/types";
import { genId } from "@/lib/crypto";
import { sendEmail } from "@/lib/email";
import { Response } from "@/lib/responses";

/**
 * The handler for the subscribe endpoint
 * @param req The request
 * @param res The response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // If not a post request
  if (req.method !== "POST") {
    return res.status(405).json(Response.MethodNotAllowed);
  }

  // Get the email, name, and phone from the request payload
  const { email, name, phone } = req.body;

  // Make sure all the fields are provided
  if (!email || !name || !phone) {
    return res.status(400).json(Response.InvalidBody);
  }

  // Generate a random secret
  const secret = await genId();
  const user: User = {
    name,
    email,
    phone,
    secret,
  };

  // Create the user
  await Prisma.createUser(user)
    .catch((_) => res.status(500).json(Response.InternalError))
    .then(async () => {
      await sendEmail(email)
        .catch((_) => res.status(500).json(Response.InternalError))
        .then(() => res.status(200).json(Response.Success));
    });
}
