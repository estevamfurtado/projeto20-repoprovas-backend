
export interface Card {
    id: number;
    name: string;
    title: string;
    number : string;
    cvv : string;
    expiry : string;
    userId: number;
    password: string;
    cardType: string;
}
export type NewCard = Omit<Card, "id">;
export type UpdateCard = Partial<Card>;