import Joi from "joi"

// const password = Joi.string().pattern(new RegExp('^[0-9]{4}$'));
// const cvv = Joi.string().pattern(new RegExp('^[0-9]{3}$'));
// const amount = Joi.number().min(0);
// const id = Joi.number().min(0);

export const Card = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    title: Joi.string().min(3).max(30),
    number : Joi.string().min(3).max(30),
    cvv : Joi.string().min(3).max(30),
    expiry : Joi.string().min(3).max(30),
    userId: Joi.number().min(0),
    password: Joi.string().min(3).max(30),
    type: Joi.string().valid('both', 'debit', 'credit'),
} as const)