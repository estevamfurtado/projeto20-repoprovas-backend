import * as User from './users.joi';
import { passesJoiSchemas } from './passes.joi';

export const joiSchemas = {
    User,
    Passes: passesJoiSchemas
}