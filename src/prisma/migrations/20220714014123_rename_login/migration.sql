/*
  Warnings:

  - You are about to drop the column `username` on the `Passes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Passes" DROP COLUMN "username",
ADD COLUMN     "login" TEXT;
