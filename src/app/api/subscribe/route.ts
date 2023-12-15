import { Response } from "@/lib/responses";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!email || !name) {
    return NextResponse.json(Response.InvalidBody, { status: 400 });
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
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  return NextResponse.json(Response.Success, { status: 200 });
}
