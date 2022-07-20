/*
  Warnings:

  - Changed the type of `number` on the `Term` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Term_number_key";

-- AlterTable
ALTER TABLE "Term" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;
