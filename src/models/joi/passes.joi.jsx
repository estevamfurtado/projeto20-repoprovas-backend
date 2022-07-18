import Joi from 'joi';

// fullName', 'emissionDate', 'expirationDate', 'issuer', 'documentType', 'registrationNumber

export const columnsJoi = {
    title: Joi.string().min(3).max(30).required(),
    name: Joi.string().min(3).max(30).required(),
    number: Joi.string().min(3).max(30).required(),
    cvv: Joi.string().min(3).max(30).required(),
    expiry: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    cardType: Joi.string().valid('both', 'debit', 'credit').required(),
    isVirtual: Joi.boolean().required(),
    url: Joi.string().min(3).max(30).required(),
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).max(30).required(),
    network: Joi.string().min(3).max(30).required(),

    documentType: Joi.string().valid('RG', 'CPF').required(),
    fullName: Joi.string().min(3).max(30).required(),
    emissionDate: Joi.string().min(3).max(30).required(),
    expirationDate: Joi.string().min(3).max(30).required(),
    registrationNumber: Joi.string().min(3).max(30).required(),
    issuer: Joi.string().min(3).max(30).required(),
};
