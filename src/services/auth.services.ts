import dotenv from 'dotenv';
import { AppError } from "../utils/errors/AppError.js";
import * as userService from './users.services.js';
import * as repos from '../repositories/index.js';
import {crypt} from '../utils/crypt/index.js';


async function signUp (password: string, confirmPassword: string, email: string) {
    if (password !== confirmPassword) {
        throw new AppError(400, 'Passwords do not match');
    }
    const newUser = await userService.createOrCrash({password, email});
    const token = crypt.jwt.create(newUser);
    return token;
}

async function signIn (password: string, email: string) {
    const user = await userService.findByEmailOrCrash(email);
    const encryptedPassword = await repos.user.getPassword(email);
    await userService.validatePasswordOrCrash(password, encryptedPassword ?? '');
    const token = crypt.jwt.create(user);
    return token;
}

function validateTokenOrCrash (token: string) {
    const decoded = crypt.jwt.decode(token);
    if (!decoded) {
        throw new AppError(401, 'Invalid token');
    }
    return decoded;
}




export { signUp, signIn, validateTokenOrCrash };