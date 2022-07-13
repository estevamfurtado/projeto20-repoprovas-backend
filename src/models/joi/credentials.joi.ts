import Joi from "joi"

export const Credential = Joi.object().keys({
    title: Joi.string().min(3).max(30),
    network: Joi.string().min(3).max(30),
    password: Joi.string().min(3).max(30),
    userId: Joi.number().min(0),
} as const)