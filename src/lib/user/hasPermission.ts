"use server";

import { UserPermission } from "@/types/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export default async function hasPermission(
  permissions: UserPermission[],
  redirectUrl?: string,
) {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return redirectUrl ? redirect(redirectUrl) : false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      permissions: true,
    },
  });

  if (!user) {
    return redirectUrl ? redirect(redirectUrl) : false;
  }

  if (!user.permissions) {
    // Might as well create the permissions if they don't exist
    await prisma.userPermission.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return hasPermission(permissions, redirectUrl);
  }

  for (const permission of permissions) {
    if (!user.permissions[permission]) {
      console.log(`User ${user.email} does not have permission ${permission}`);
      return redirectUrl !== undefined ? redirect(redirectUrl) : false;
    }
  }

  return true;
}
