import Joi from "joi"



// Cards -> ok

const NewCard = Joi.object().keys({
    type: Joi.string().valid('card').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(1).max(50).required(),
    name: Joi.string().min(3).max(100).required(),
    number : Joi.string().min(16).max(20).required(),
    cvv : Joi.string().min(3).max(4).required(), 
    expiry : Joi.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/).required(),
    password: Joi.string().min(4).max(30).required(),
    cardType: Joi.string().valid('both', 'debit', 'credit').required(),
    isVirtual: Joi.boolean().required(),
} as const)

const UpdateCard = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    title: Joi.string().min(1).max(50),
    name: Joi.string().min(3).max(100),
    number : Joi.string().min(16).max(20),
    cvv : Joi.string().min(3).max(4), 
    expiry : Joi.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/),
    password: Joi.string().min(4).max(30).required(),
    cardType: Joi.string().valid('both', 'debit', 'credit'),
    isVirtual: Joi.boolean(),
} as const)

// Credentials

const NewCredential = Joi.object().keys({
    type: Joi.string().valid('credential').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(1).max(50).required(),
    url: Joi.string().uri().required(),
    login: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
} as const)

const UpdateCredential = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    title: Joi.string().min(1).max(50),
    url: Joi.string().uri(),
    login: Joi.string().min(3).max(50),
    password: Joi.string().min(3).max(50),
} as const)

// Notes -> ok

const NewNote = Joi.object().keys({
    type: Joi.string().valid('note').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(1).max(50).required(),
    content: Joi.string().min(1).max(1000).required(),
} as const)

const UpdateNote = Joi.object().keys({
    passId: Joi.number().min(0).required(),
    title: Joi.string().min(1).max(50),
    content: Joi.string().min(1).max(1000),
} as const)

// Wifis

const NewWifi = Joi.object().keys({
    type: Joi.string().valid('wifi').required(),
    userId: Joi.number().min(0).required(),
    title: Joi.string().min(3).max(50).required(),
    network: Joi.string().min(3).max(30).required(),
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
    // date format: YYYY-MM-DD
    emissionDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
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