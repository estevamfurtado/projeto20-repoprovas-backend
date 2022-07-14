import * as UserTypes from '../models/types/users.types'
import { client } from "../database";
import { AppError } from '../utils/errors/AppError';
import {crypt} from '../utils/crypt';


// Primitive

export async function create (user: UserTypes.UserInsertData) {
    const encryptedPassword = crypt.bcrypt.encrypt(user.password);
    const newUserData = {...user, password: encryptedPassword};
    const newUser = await client.users.create({data: newUserData});
    return newUser;
}

export async function findByEmail (email: string) {
    const user = await client.users.findUnique({where: {email}});
    return user;
}

// Complex

export async function createOrCrash (newUserData: UserTypes.UserInsertData) {
    const user = await findByEmail(newUserData.email);
    if (user) {
        throw new AppError(400, 'User already exists');
    }
    const newUser = await create(newUserData);
    return newUser;
}

export async function findByEmailOrCrash (email: string) {
    const user = await findByEmail(email);
    if (!user) {
        throw new AppError(400, 'User does not exist');
    }
    return user;
}

export async function validatePasswordOrCrash (password: string, user: UserTypes.User) {
    const isValid = crypt.bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new AppError(400, 'Wrong password');
    }
    return isValid;
}