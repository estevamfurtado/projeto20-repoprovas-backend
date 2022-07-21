import { UserCreateInput, User, GetUser } from '../models/types/index.js';
import prisma from '../prisma/index.js';
import { crypt } from '../utils/crypt/index.js';


export async function create(data: UserCreateInput): Promise<User> {
    const encryptedPassword = crypt.bcrypt.encrypt(data.password);
    const newData = {...data, password: encryptedPassword};
    return await prisma.user.create({data: newData});
}

export async function findByEmail(email: string): Promise<GetUser | null> {
    const user = await prisma.user.findFirst({
        where: {email: email},
        select: {id: true, email: true,},
    });
    return user;
}

export async function getPassword(email: string): Promise<string | null> {
    const user = await prisma.user.findFirst({
        where: {email: email},
        select: {password: true},
    });
    return user?.password ?? null;
}

export async function findById(id: number): Promise<GetUser | null> {
    const user = await prisma.user.findFirst({
        where: {id: id},
        select: {id: true, email: true,},
    });
    return user;
}