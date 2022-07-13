import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from "../utils/errors/AppError";
import * as userService from './users';

dotenv.config();
const secretKey = process.env.JWT_SECRET ?? 'JWT_SECRET';


async function signUp (password: string, email: string) {
    const newUser = await userService.createOrCrash({password, email});
    const token = createToken(newUser);
    return token;
}

async function signIn (password: string, email: string) {
    const user = await userService.findByEmailOrCrash(email);
    await userService.validatePasswordOrCrash(password, user);
    const token = createToken(user);
    return token;
}

async function validateTokenOrCrash (token: string) {
    const decoded = decodeToken(token);
    if (!decoded) {
        throw new AppError(400, 'Invalid token');
    }
    return decoded;
}


function createToken (saveData: any) {
    const data = {saveData};
    const config = { expiresIn: '1h' };
    const token = jwt.sign(data, secretKey, config);
    return token;
}

function decodeToken (token: string) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
}

export { signUp, signIn, validateTokenOrCrash };