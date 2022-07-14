/*
  Warnings:

  - Added the required column `cardType` to the `Passes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passes" ADD COLUMN     "cardType" TEXT NOT NULL;
