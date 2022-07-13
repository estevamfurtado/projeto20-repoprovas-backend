import Cryptr from "cryptr"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const cryptrSecret = process.env.JWT_SECRET ?? 'JWT_SECRET';
const cryptr = new Cryptr(cryptrSecret);

function encryptCryptr (value: string) {
    const encryptedPassword = cryptr.encrypt(value);
    return encryptedPassword;
} 
function decryptCryptr (value: string) {
    const decryptedPassword = cryptr.decrypt(value);
    return decryptedPassword;
} 


function encryptBcrypt (value: string) {
    const encryptedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
    return encryptedPassword;
}
function compareBcrypt (value: string, encryptedValue: string) {
    const isValid = bcrypt.compareSync(value, encryptedValue);
    return isValid;
}

export const crypt = {
    cryptr: {encrypt: encryptCryptr, decrypt: decryptCryptr},
    bcrypt: {encrypt: encryptBcrypt, compare: compareBcrypt}
}
