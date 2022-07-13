export interface Wifi {
    id: number;
    userId: number;
    title: string;
    network: string;
    password: string;
}
export type InsertData = Omit<Wifi, "id">;
export type UpdateData = Partial<Wifi>;