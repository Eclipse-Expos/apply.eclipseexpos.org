/*
  Warnings:

  - You are about to drop the column `school` on the `HiringApplication` table. All the data in the column will be lost.
  - Added the required column `institution` to the `HiringApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiringApplication" DROP COLUMN "school",
ADD COLUMN     "institution" TEXT NOT NULL;
