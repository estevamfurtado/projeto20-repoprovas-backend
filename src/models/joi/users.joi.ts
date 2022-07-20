import Joi from "joi"

export const User = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(4),
} as const)

export const SignUp = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
} as const)

export const SignIn = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
} as const)