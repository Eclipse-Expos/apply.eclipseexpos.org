/*
  Warnings:

  - You are about to drop the column `RecordAnswer` on the `HiringApplication` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `HiringApplication` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `HiringApplication` table. All the data in the column will be lost.
  - Added the required column `portfolioPath` to the `HiringApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordAnswer` to the `HiringApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumePath` to the `HiringApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiringApplication" DROP COLUMN "RecordAnswer",
DROP COLUMN "portfolio",
DROP COLUMN "resume",
ADD COLUMN     "portfolioPath" TEXT NOT NULL,
ADD COLUMN     "recordAnswer" TEXT NOT NULL,
ADD COLUMN     "resumePath" TEXT NOT NULL;
