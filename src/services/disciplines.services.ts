import * as repos from '../repositories/';
import { AppError } from "../utils/errors/AppError";
import {Discipline} from "../models/types";

export async function validateIdExistsOrCrash (id: number) : Promise<Discipline> {
    const result = await repos.discipline.findById(id);
    if (!result) {
        throw new AppError(404, `Discipline with id ${id} does not exist`);
    }
    return result;
}