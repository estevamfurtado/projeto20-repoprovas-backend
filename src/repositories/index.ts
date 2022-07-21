import * as user from './user.repository.js';
import * as test from './test.repository.js';
import * as teacher from './teacher.repository.js';
import * as term from './term.repository.js';
import * as discipline from './discipline.repository.js';
import * as category from './category.repository.js';
import * as categoryOnDiscipline from './category-discipline.repository.js';
import * as categoryOnTeacher from './category-teacher.repository.js';
import * as disciplineOnTeacher from './discipline-teacher.repository.js';

export {
    user,
    test,
    teacher,
    term,
    discipline,
    category,
    categoryOnDiscipline,
    categoryOnTeacher,
    disciplineOnTeacher,
}