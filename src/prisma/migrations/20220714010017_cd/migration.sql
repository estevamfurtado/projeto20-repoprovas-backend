/*
  Warnings:

  - You are about to drop the column `cvc` on the `Passes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Passes" DROP COLUMN "cvc",
ADD COLUMN     "cvv" TEXT;
