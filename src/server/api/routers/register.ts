import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Response } from "@/lib/responses";
import { sendEmail } from "@/lib/email";
import { createUser } from "@/utils/prisma";

// Register router for trpc
export const registerRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().min(1).max(255),
      }),
    )
    .mutation(async ({ input }) => {
      // Verify that the input is valid
      const { name, email } = input;
      if (!email || !name) {
        return Response.InvalidInput;
      }

      // Create the user
      try {
        await createUser(name, email);
      } catch (err) {
        return Response.InternalError;
      }

      // TODO: Eventually pull subject + body from db
      await sendEmail(email, "Welcome to Eclipse!", "Let's break some records");

      // Return the success body
      return Response.Success;
    }),
});
