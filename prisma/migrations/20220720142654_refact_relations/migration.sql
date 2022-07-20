-- CreateTable
CREATE TABLE "CategoryOnDisciplineOnTeacher" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "CategoryOnDisciplineOnTeacher_pkey" PRIMARY KEY ("categoryId","disciplineId","teacherId")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryId_disciplineId_teacherId_fkey" FOREIGN KEY ("categoryId", "disciplineId", "teacherId") REFERENCES "CategoryOnDisciplineOnTeacher"("categoryId", "disciplineId", "teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnDisciplineOnTeacher" ADD CONSTRAINT "CategoryOnDisciplineOnTeacher_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnDisciplineOnTeacher" ADD CONSTRAINT "CategoryOnDisciplineOnTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnDisciplineOnTeacher" ADD CONSTRAINT "CategoryOnDisciplineOnTeacher_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
