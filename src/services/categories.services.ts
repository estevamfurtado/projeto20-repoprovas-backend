import * as repos from '../repositories/index.js';
import { AppError } from "../utils/errors/AppError.js";
import {Category} from "../models/types/index.js";

export async function validateIdExistsOrCrash (id: number) : Promise<Category> {
    const result = await repos.discipline.findById(id);
    if (!result) {
        throw new AppError(404, `Category with id ${id} does not exist`);
    }
    return result;
}