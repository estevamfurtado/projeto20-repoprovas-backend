import * as repos from '../repositories/index.js';
import { AppError } from "../utils/errors/AppError.js";
import {Teacher} from "../models/types/index.js";

export async function validateIdExistsOrCrash (id: number) : Promise<Teacher> {
    const result = await repos.teacher.findById(id);
    if (!result) {
        throw new AppError(404, `Teacher with id ${id} does not exist`);
    }
    return result;
}