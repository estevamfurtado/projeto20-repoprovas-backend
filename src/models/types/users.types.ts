export interface User {
    id: number;
    email: string;
    password: string;
}
export type UserInsertData = Omit<User, "id">;
export type UserUpdateData = Partial<User>;