/*
  Warnings:

  - You are about to drop the column `courseId` on the `Term` table. All the data in the column will be lost.
  - You are about to drop the `CategoryOnDisciplineOnTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryOnDisciplineOnTeacher" DROP CONSTRAINT "CategoryOnDisciplineOnTeacher_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnDisciplineOnTeacher" DROP CONSTRAINT "CategoryOnDisciplineOnTeacher_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnDisciplineOnTeacher" DROP CONSTRAINT "CategoryOnDisciplineOnTeacher_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Term" DROP CONSTRAINT "Term_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_categoryId_disciplineId_teacherId_fkey";

-- AlterTable
ALTER TABLE "Term" DROP COLUMN "courseId";

-- DropTable
DROP TABLE "CategoryOnDisciplineOnTeacher";

-- DropTable
DROP TABLE "Course";

-- CreateTable
CREATE TABLE "CategoryOnDiscipline" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "CategoryOnDiscipline_pkey" PRIMARY KEY ("categoryId","disciplineId")
);

-- CreateTable
CREATE TABLE "CategoryOnTeacher" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "CategoryOnTeacher_pkey" PRIMARY KEY ("categoryId","teacherId")
);

-- CreateTable
CREATE TABLE "DisciplineOnTeacher" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "DisciplineOnTeacher_pkey" PRIMARY KEY ("disciplineId","teacherId")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryId_disciplineId_fkey" FOREIGN KEY ("categoryId", "disciplineId") REFERENCES "CategoryOnDiscipline"("categoryId", "disciplineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryId_teacherId_fkey" FOREIGN KEY ("categoryId", "teacherId") REFERENCES "CategoryOnTeacher"("categoryId", "teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_disciplineId_teacherId_fkey" FOREIGN KEY ("disciplineId", "teacherId") REFERENCES "DisciplineOnTeacher"("disciplineId", "teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnDiscipline" ADD CONSTRAINT "CategoryOnDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnDiscipline" ADD CONSTRAINT "CategoryOnDiscipline_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnTeacher" ADD CONSTRAINT "CategoryOnTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnTeacher" ADD CONSTRAINT "CategoryOnTeacher_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineOnTeacher" ADD CONSTRAINT "DisciplineOnTeacher_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineOnTeacher" ADD CONSTRAINT "DisciplineOnTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
