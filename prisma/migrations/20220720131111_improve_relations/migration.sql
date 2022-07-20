/*
  Warnings:

  - The primary key for the `TeacherDiscipline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TeacherDiscipline` table. All the data in the column will be lost.
  - You are about to drop the column `teacherDisciplineId` on the `Test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_teacherDisciplineId_fkey";

-- AlterTable
ALTER TABLE "TeacherDiscipline" DROP CONSTRAINT "TeacherDiscipline_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TeacherDiscipline_pkey" PRIMARY KEY ("teacherId", "disciplineId");

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "teacherDisciplineId",
ADD COLUMN     "disciplineId" INTEGER,
ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherId_disciplineId_fkey" FOREIGN KEY ("teacherId", "disciplineId") REFERENCES "TeacherDiscipline"("teacherId", "disciplineId") ON DELETE SET NULL ON UPDATE CASCADE;
