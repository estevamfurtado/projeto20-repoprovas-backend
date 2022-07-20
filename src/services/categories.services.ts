import * as repos from '../repositories';
import { AppError } from "../utils/errors/AppError";
import {Category} from "../models/types";

export async function validateIdExistsOrCrash (id: number) : Promise<Category> {
    const result = await repos.discipline.findById(id);
    if (!result) {
        throw new AppError(404, `Category with id ${id} does not exist`);
    }
    return result;
}