"use server";

import { getServerSession } from "next-auth";
import { prisma } from "../prisma";

export async function getSessionUser() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
