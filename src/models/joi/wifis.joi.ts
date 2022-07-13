import Joi from "joi"

export const Wifi = Joi.object().keys({
    network: Joi.string().min(3).max(30),
    title: Joi.string().min(3).max(30),
    password: Joi.string().min(3).max(30),
    userId: Joi.number().min(0),
} as const)