
export interface Credential {
    id: number;
    userId: number;
    title: string;
    url: string;
    login: string;
    password: string;
}
export type NewCredential = Omit<Credential, "id">;
export type UpdateCredential = Partial<Credential>;