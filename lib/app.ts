import axios from "axios";
import type { AddNoteFormValue, Note } from '../types/note';

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }

})
export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(page:number, search:string ) : Promise<NoteResponse>{
  const res = await api.get<NoteResponse>("/notes", {
    params:{
        page,
        perPage: 12,
        sortBy: 'created',
        search
    },
  });
  return res.data;
}
export async function createNote(note: AddNoteFormValue) {
  const res = await api.post<Note>("/notes", note);
  return res.data;
}
export async function deleteNote(id: string) {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id:string) : Promise<Note>{
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}
 