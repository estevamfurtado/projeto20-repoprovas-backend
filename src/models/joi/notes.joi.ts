import Joi from "joi"

export const Note = Joi.object().keys({
    title: Joi.string().min(3).max(30),
    content: Joi.string().min(3).max(30),
    userId: Joi.number().min(0),
} as const)