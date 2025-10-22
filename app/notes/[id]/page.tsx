import { fetchNoteById } from "@/lib/app";
import { dehydrate, QueryClient ,HydrationBoundary} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";

interface Props {
  params: Promise<{ noteId: string }>;
}

export default async function NotePage({ params }: Props){
     const { noteId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
