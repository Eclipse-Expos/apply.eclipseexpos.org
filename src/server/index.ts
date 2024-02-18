import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

export const appRouter = router({
  register: publicProcedure
    .input(
      // Input validation with zod
      z.object({
        firstName: z.string().min(1).max(255),
        lastName: z.string().min(1).max(255),
        email: z.string().min(1).max(255),
      }),
    )
    .mutation(async (opts) => {
      // Check if user already exists
      const user = await prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
        include: {
          mailingList: true,
        },
      });

      if (user) {
        if (user.mailingList) {
          return null;
        } else {
          await prisma.mailingList.create({
            data: {
              user: {
                connect: {
                  id: user.id,
                },
              },

              preRegistered: true,
            },
          });
        }

        return user;
      }

      // If user doesn't exist, create them

      const newUser = await prisma.user.create({
        data: {
          firstName: opts.input.firstName,
          lastName: opts.input.lastName,
          email: opts.input.email,

          mailingList: {
            create: {
              preRegistered: true,
            },
          },
        },
      });

      // Send welcome email

      await sendEmail(
        newUser.email,
        "Welcome to Eclipse!",
        "Let's break some records",
      );

      return newUser;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
