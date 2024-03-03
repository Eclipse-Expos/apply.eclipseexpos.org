import { prisma } from "@/lib/prisma";
import hasPermission from "@/lib/user/hasPermission";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs/promises";

type Props = {
  params: {
    applicationId: string;
  };
};

export async function GET(request: Request, { params }: Props) {
  if (!(await hasPermission(["canManageHiringApplications"]))) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const application = await prisma.hiringApplication.findUnique({
    where: {
      id: params.applicationId,
    },
  });

  // Get file buffer
  if (!application) {
    return new Response("No application found", {
      status: 404,
    });
  }

  const file = await fs.readFile(
    `${process.cwd()}/upload/${application.resumePath}`,
  );

  return new Response(file, {
    headers: {
      "Content-Type":
        (await fileTypeFromBuffer(file))?.mime || "application/pdf",
      "Content-Disposition": `inline; filename="${application.resumeName}"`,
    },
  });
}
