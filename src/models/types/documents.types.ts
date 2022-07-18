enum DocumentType {
    CPF = 'CPF',
    RG = 'RG',
}

export interface Document {
    id: number;
    userId: number;
    title: string;
    fullName: string;
    emissionDate: string;
    expirationDate: string;
    registrationNumber: string;
    issuer: string;
    documentType: DocumentType;
}
export type NewDocument = Omit<Document, "id">;
export type UpdateDocument = Partial<Document>;