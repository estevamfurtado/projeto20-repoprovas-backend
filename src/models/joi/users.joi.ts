import Joi from "joi"

export const User = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(30),
} as const)

export const SignUp = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
} as const)

export const SignIn = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
} as const)