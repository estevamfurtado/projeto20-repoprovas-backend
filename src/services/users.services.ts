import {GetUser, User, UserCreateInput} from '../models/types/index.js';
import * as repos from '../repositories/index.js';
import { AppError } from '../utils/errors/AppError.js';
import {crypt} from '../utils/crypt/index.js';



export async function createOrCrash (newUserData: UserCreateInput): Promise<User> {
    const user = await repos.user.findByEmail(newUserData.email);
    if (user) {throw new AppError(400, 'User already exists');}
    const newUser = await repos.user.create(newUserData);
    return newUser;
}

export async function findByEmailOrCrash (email: string): Promise<GetUser | null> {
    const user = await repos.user.findByEmail(email);
    if (!user) {
        throw new AppError(401, 'User does not exist');
    }
    return user;
}

export async function validatePasswordOrCrash (password: string, userPassword: string): Promise<boolean> {
    const isValid = crypt.bcrypt.compare(password, userPassword);
    if (!isValid) {
        throw new AppError(401, 'Wrong password');
    }
    return isValid;
}