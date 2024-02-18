/*
  Warnings:

  - You are about to drop the column `email` on the `MailingList` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `MailingList` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `MailingList` table. All the data in the column will be lost.
  - Made the column `userId` on table `MailingList` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MailingList" DROP CONSTRAINT "MailingList_userId_fkey";

-- DropIndex
DROP INDEX "MailingList_email_key";

-- AlterTable
ALTER TABLE "MailingList" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MailingList" ADD CONSTRAINT "MailingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
