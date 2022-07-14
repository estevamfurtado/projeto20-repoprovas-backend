export interface Wifi {
    id: number;
    userId: number;
    title: string;
    network: string;
    password: string;
}
export type NewWifi = Omit<Wifi, "id">;
export type UpdateWifi = Partial<Wifi>;