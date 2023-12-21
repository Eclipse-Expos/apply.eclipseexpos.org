import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

export const appRouter = router({
  register: publicProcedure
    .input(
      // Input validation with zod
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().min(1).max(255),
      }),
    )
    .mutation(async (opts) => {
      try {
        const user = await prisma.user.create({
          data: {
            name: opts.input.name,
            email: opts.input.email,
          },
        });

        await sendEmail(
          user.email,
          "Welcome to Eclipse!",
          "Let's break some records",
        );

        return user;
      } catch (e) {
        // This will only happen if the email is already taken (or db isn't running).
        console.warn(`User with email ${opts.input.email} already exists.`);
        return null;
      }
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
