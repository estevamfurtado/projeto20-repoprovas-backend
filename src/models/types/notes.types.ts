

export interface Note {
    id: number;
    userId: number;
    title: string;
    content: string;
}
export type NewNote = Omit<Note, "id">;
export type UpdateNote = Partial<Note>;