
export interface Credential {
    id: number;
    userId: number;
    title: string;
    url: string;
    login: string;
    password: string;
}
export type InsertData = Omit<Credential, "id">;
export type UpdateData = Partial<Credential>;