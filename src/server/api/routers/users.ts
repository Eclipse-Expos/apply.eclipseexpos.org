import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Response } from "@/lib/responses";
import { getUser } from "@/utils/prisma";

// Users router for trpc
export const usersRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ email: z.string().min(1).max(255) }))
    .query(async ({ input }) => {
      // Verify that the input is valid
      const { email } = input;
      if (!email) {
        return Response.InvalidInput;
      }

      // Get the user from the database
      const user = await getUser(email);
      if (!user) {
        return Response.NotFound;
      }

      // Return the user and the success json response
      return { ...Response.Success, user };
    }),
});
