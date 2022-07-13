import Joi from 'joi';
import * as User from './users.joi';
import { Card } from './cards.joi';
import { Credential } from './credentials.joi';
import { Note } from './notes.joi';
import { Wifi } from './wifis.joi';

export const joiSchemas = {
    User,
    Card,
    Credential,
    Note,
    Wifi,
}