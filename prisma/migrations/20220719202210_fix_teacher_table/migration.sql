/*
  Warnings:

  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `name` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Teacher_email_key";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "email",
ADD COLUMN     "name" TEXT NOT NULL;
