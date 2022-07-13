

export interface Note {
    id: number;
    userId: number;
    title: string;
    content: string;
}
export type NotesInsertData = Omit<Note, "id">;
export type NotesUpdateData = Partial<Note>;