import { prisma } from "@/lib/prisma";

/**
 * Creates a user in the database
 * @param name The name of the user
 * @param email The email of the user
 * @returns The created user
 */
export async function createUser(name: string, email: string) {
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  });
}

/**
 * Gets a user by their email
 * @param email The email of the user
 * @returns The user
 */
export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
