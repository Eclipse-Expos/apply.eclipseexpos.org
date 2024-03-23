"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stringTitle } from "@/utils/stringTitle";

const formSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  dateOfBirth: z.string().min(1).max(255),
  institution: z.string().min(1).max(255),
  aboutAnswer: z.string().min(1).max(255),
  recordAnswer: z.string().min(1).max(255),
});

export type Result = { message: string } & (
  | {
      success: true;
    }
  | {
      success: false;
      error: "missingFields";
    }
);

export async function formSubmit(data: FormData): Promise<Result> {
  // Parse all this stuff
  try {
    const parsedData = formSchema.parse({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      dateOfBirth: data.get("dateOfBirth"),
      institution: data.get("institution"),
      aboutAnswer: data.get("aboutAnswer"),
      recordAnswer: data.get("recordAnswer"),
    });

    console.log("Received Application", parsedData);

    // Save the data to the database
    await prisma.attendApplication.create({
      data: {
        firstName: stringTitle(parsedData.firstName.trim()),
        lastName: stringTitle(parsedData.lastName.trim()),
        email: parsedData.email.trim().toLowerCase(),
        dateOfBirth: new Date(parsedData.dateOfBirth),
        institution: parsedData.institution.trim(),
        aboutAnswer: parsedData.aboutAnswer.trim(),
        recordAnswer: parsedData.recordAnswer.trim(),
      },
    });

    return {
      success: true,
      message: "Success",
    };
  } catch (e) {
    return {
      success: false,
      error: "missingFields",
      message: "Some fields are missing",
    };
  }
}
