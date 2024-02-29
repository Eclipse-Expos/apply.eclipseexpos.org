/*
  Warnings:

  - Added the required column `resumeName` to the `HiringApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiringApplication" ADD COLUMN     "portfolioName" TEXT,
ADD COLUMN     "resumeName" TEXT NOT NULL;
