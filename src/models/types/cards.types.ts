
enum CardType {
    Both = 'both',
    Credit = 'credit',
    Debit = 'debit',
}


export interface Card {
    id: number;
    name: string;
    title: string;
    number : string;
    cvv : string;
    expiry : string;
    userId: number;
    password: string;
    cardType: CardType;
}
export type NewCard = Omit<Card, "id">;
export type UpdateCard = Partial<Card>;