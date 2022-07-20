import * as repos from '../repositories/';
import { AppError } from "../utils/errors/AppError";
import {Teacher} from "../models/types";

export async function validateIdExistsOrCrash (id: number) : Promise<Teacher> {
    const result = await repos.teacher.findById(id);
    if (!result) {
        throw new AppError(404, `Teacher with id ${id} does not exist`);
    }
    return result;
}