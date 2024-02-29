"use server";

import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stringTitle } from "@/utils/stringTitle";

const formSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  dateOfBirth: z.string().min(1).max(255),
  institution: z.string().min(1).max(255),
  resume: z.custom<File>(),
  portfolio: z.custom<File>(),
  aboutAnswer: z.string().min(1).max(255),
  recordAnswer: z.string().min(1).max(255),
});

export type Result = { message: string } & (
  | {
      success: true;
    }
  | {
      success: false;
      error: "fileTooLarge" | "missingFields";
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
      resume: data.get("resume"),
      portfolio: data.get("portfolio"),
      aboutAnswer: data.get("aboutAnswer"),
      recordAnswer: data.get("recordAnswer"),
    });

    console.log("Received Application", parsedData);

    const resumePath = uuidv4();
    const portfolioPath = uuidv4();

    // Do size checks before writing any files
    if (parsedData.resume.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: "fileTooLarge",
        message: "Files must be less than 10MB in size",
      };
    }

    if (parsedData.portfolio.size != 0) {
      if (parsedData.portfolio.size > 10 * 1024 * 1024) {
        return {
          success: false,
          error: "fileTooLarge",
          message: "Files must be less than 10MB in size",
        };
      }
    }

    // Write the files to disk
    await fs.writeFile(
      `${process.cwd()}/upload/${resumePath}`,
      Buffer.from(await parsedData.resume.arrayBuffer()),
    );

    if (parsedData.portfolio.size != 0) {
      await fs.writeFile(
        `${process.cwd()}/upload/${portfolioPath}`,
        Buffer.from(await parsedData.portfolio.arrayBuffer()),
      );
    }

    // Save the data to the database
    await prisma.hiringApplication.create({
      data: {
        firstName: stringTitle(parsedData.firstName.trim()),
        lastName: stringTitle(parsedData.lastName.trim()),
        email: parsedData.email.trim().toLowerCase(),
        dateOfBirth: new Date(parsedData.dateOfBirth),
        institution: parsedData.institution.trim(),
        resumePath: resumePath,
        resumeName: parsedData.resume.name,
        portfolioPath: parsedData.portfolio.size != 0 ? portfolioPath : null,
        portfolioName: parsedData.portfolio?.name,
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
