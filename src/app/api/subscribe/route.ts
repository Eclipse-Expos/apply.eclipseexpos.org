import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "@/lib/responses";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  if (!email || !name) {
    return res.status(400).json(Response.InvalidBody);
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    await sendEmail(email, "", ""); // TODO: Eventually pull subject + body from db
  } catch (err) {
    console.error(err);
    return res.status(500).json(Response.InternalError);
  }

  res.status(200).json(Response.Success);
}
