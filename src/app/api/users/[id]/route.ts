import { Response } from "@/lib/responses";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { base64decode } from "@/lib/crypto";

// This route is used to get a user by their email
export async function GET(_: NextRequest, { params }: any) {
  // Get the id from the url parameters
  const { id } = params;
  if (!id) {
    return NextResponse.json(Response.InvalidQueryParams, { status: 400 });
  }

  // Get the users email by base64 decoding the id
  const email = base64decode(id);

  // Get the user from the database
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If the user doesn't exist, return an error
  if (!user) {
    return NextResponse.json(Response.InternalError, { status: 500 });
  }

  // Return the user and the success json response
  return NextResponse.json(
    {
      user,
      ...Response.Success,
    },
    { status: 200 },
  );
}
