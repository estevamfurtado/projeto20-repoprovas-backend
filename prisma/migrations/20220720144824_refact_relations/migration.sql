/*
  Warnings:

  - You are about to drop the `_CategoryToDiscipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisciplineToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToDiscipline" DROP CONSTRAINT "_CategoryToDiscipline_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToDiscipline" DROP CONSTRAINT "_CategoryToDiscipline_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTeacher" DROP CONSTRAINT "_CategoryToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTeacher" DROP CONSTRAINT "_CategoryToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToTeacher" DROP CONSTRAINT "_DisciplineToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToTeacher" DROP CONSTRAINT "_DisciplineToTeacher_B_fkey";

-- DropTable
DROP TABLE "_CategoryToDiscipline";

-- DropTable
DROP TABLE "_CategoryToTeacher";

-- DropTable
DROP TABLE "_DisciplineToTeacher";
