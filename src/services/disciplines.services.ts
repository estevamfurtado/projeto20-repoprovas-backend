import * as repos from '../repositories/index.js';
import { AppError } from "../utils/errors/AppError.js";
import {Discipline} from "../models/types/index.js";

export async function validateIdExistsOrCrash (id: number) : Promise<Discipline> {
    const result = await repos.discipline.findById(id);
    if (!result) {
        throw new AppError(404, `Discipline with id ${id} does not exist`);
    }
    return result;
}