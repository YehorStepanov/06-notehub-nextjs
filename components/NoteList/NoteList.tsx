
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/app";
import { Note } from "@/lib/note";
import Link from "next/link";

interface NoteListProps{
  notes: Note[]
}

export default function NoteList({notes}:NoteListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const deleteElem = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <ul className={css.list}>
      { notes.map((note : Note)=>{
        return <li key={note.id} className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <Link className={css.link} href={`/notes/${note.id}`}>View details</Link>
          <button onClick={()=>deleteElem(note.id)} className={css.button}>Delete</button>
        </div>
      </li>
      })}
    </ul>
  );
}
