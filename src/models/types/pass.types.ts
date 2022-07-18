import { Card } from './cards.types';
import { Note } from './notes.types';
import { Document } from './documents.types';
import { Wifi } from './wifis.types';
import {Credential} from './credentials.types';

export type Pass = Card | Note | Document | Wifi | Credential;

export interface Passes {
    id: number;
    createdAt: Date;
    userId: number;
    type: string;
    title: string;
    password: string;
    number: string;
    cvv: string;
    expiry: string;
    name: string;
    url: string;
    login: string;
    network: string;
    cardType: string;
    issuer: string;
    documentType: string;
    fullName: string;
    emissionDate: string;
    expirationDate: string;
    registrationNumber: string;
    isVirtual: boolean;
}
