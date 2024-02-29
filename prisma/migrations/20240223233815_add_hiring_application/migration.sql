-- CreateTable
CREATE TABLE "HiringApplication" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "school" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "aboutAnswer" TEXT NOT NULL,
    "recordAnswer" TEXT NOT NULL,

    CONSTRAINT "HiringApplication_pkey" PRIMARY KEY ("id")
);
