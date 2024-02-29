/*
  Warnings:

  - You are about to drop the column `recordAnswer` on the `HiringApplication` table. All the data in the column will be lost.
  - Added the required column `RecordAnswer` to the `HiringApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiringApplication" DROP COLUMN "recordAnswer",
ADD COLUMN     "RecordAnswer" TEXT NOT NULL;
