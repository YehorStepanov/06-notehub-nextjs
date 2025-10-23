import { fetchNoteById } from "@/lib/api";
import { dehydrate, QueryClient ,HydrationBoundary} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: Props){
     const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
