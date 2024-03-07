/*
  Warnings:

  - Added the required column `result` to the `LoginAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoginResult" AS ENUM ('SUCCESS', 'INVALID_PASSWORD', 'USER_NOT_FOUND', 'TOO_MANY_ATTEMPTS');

-- AlterTable
ALTER TABLE "LoginAttempt" ADD COLUMN     "result" "LoginResult" NOT NULL;
