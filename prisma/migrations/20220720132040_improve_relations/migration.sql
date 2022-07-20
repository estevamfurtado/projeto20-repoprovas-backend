/*
  Warnings:

  - Made the column `disciplineId` on table `Test` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherId` on table `Test` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_teacherId_disciplineId_fkey";

-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "disciplineId" SET NOT NULL,
ALTER COLUMN "teacherId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherId_disciplineId_fkey" FOREIGN KEY ("teacherId", "disciplineId") REFERENCES "TeacherDiscipline"("teacherId", "disciplineId") ON DELETE RESTRICT ON UPDATE CASCADE;
