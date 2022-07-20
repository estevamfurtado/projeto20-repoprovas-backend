import dotenv from 'dotenv';
import { AppError } from "../utils/errors/AppError";
import * as userService from './users.services';
import * as repos from '../repositories';
import {crypt} from '../utils/crypt';


async function signUp (password: string, email: string) {
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