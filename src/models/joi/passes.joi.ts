import Joi from "joi"

// Cards

const NewCard = Joi.object().keys({
    type: Joi.string().valid('card').required(),
    userId: Joi.number().min(0).required(),
    name: Joi.string().min(3).max(30).required(),
    title: Joi.string().min(3).max(30).required(),
    number : Joi.string().min(3).max(30).required(),
    cvv : Joi.string().min(3).max(30).required(),
    expiry : Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    cardType: Joi.string().valid('both', 'debit', 'credit').required(),
    isVirtual: Joi.boolean().required(),
} as const)

const UpdateCard = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    name: Joi.string().min(3).max(30),
    title: Joi.string().min(3).max(30),
    number : Joi.string().min(3).max(30),
    cvv : Joi.string().min(3).max(30),
    expiry : Joi.string().min(3).max(30),
    password: Joi.string().min(3).max(30),
    cardType: Joi.string().valid('both', 'debit', 'credit'),
    isVirtual: Joi.boolean(),
} as const)

// Credentials

const NewCredential = Joi.object().keys({
    type: Joi.string().valid('credential').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(30).required(),
    url: Joi.string().min(3).max(30).required(),
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
} as const)

const UpdateCredential = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    url: Joi.string().min(3).max(30),
    login: Joi.string().min(3).max(30),
    password: Joi.string().min(3).max(30),
} as const)

// Notes

const NewNote = Joi.object().keys({
    type: Joi.string().valid('note').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).max(30).required(),
} as const)

const UpdateNote = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(30),
    content: Joi.string().min(3).max(30),
} as const)

// Wifis

const NewWifi = Joi.object().keys({
    type: Joi.string().valid('wifi').required(),
    userId: Joi.number().min(0).required(),
    network: Joi.string().min(3).max(30).required(),
    title: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
} as const)

const UpdateWifi = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(30),
    network: Joi.string().min(3).max(30),
    password: Joi.string().min(3).max(30),
} as const)

// DOCUMENTS

const NewDocument = Joi.object().keys({
    type: Joi.string().valid('document').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(30).required(),
    fullName: Joi.string().min(3).max(30).required(),
    emissionDate: Joi.string().min(3).max(30).required(),
    expirationDate: Joi.string().min(3).max(30).required(),
    registrationNumber: Joi.string().min(3).max(30).required(),
    issuer: Joi.string().min(3).max(30).required(),
    documentType: Joi.string().valid('CPF', 'RG').required(),
} as const)

const UpdateDocument = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(30),
    fullName: Joi.string().min(3).max(30),
    emissionDate: Joi.string().min(3).max(30),
    expirationDate: Joi.string().min(3).max(30),
    registrationNumber: Joi.string().min(3).max(30),
    issuer: Joi.string().min(3).max(30),
    documentType: Joi.string().valid('CPF', 'RG'),
} as const)

// ALL

export const passesJoiSchemas = { 
    new: {
        card: NewCard,
        credential: NewCredential,
        note: NewNote,
        wifi: NewWifi,
        document: NewDocument,
    }
    , update: {
        card: UpdateCard,
        credential: UpdateCredential,
        note: UpdateNote,
        wifi: UpdateWifi,
        document: UpdateDocument,
    }
}