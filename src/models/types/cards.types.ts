
export interface Card {
    id: number;
    name: string;
    title: string;
    number : string;
    cvv : string;
    expiry : string;
    userId: number;
    password: string;
}
export type InsertData = Omit<Card, "id">;
export type UpdateData = Partial<Card>;