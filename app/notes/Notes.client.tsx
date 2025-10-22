'use client';

import Pagination from '@/components/Pagination/Pagination';
import css from '../page.module.css';
import { fetchNotes, NoteResponse } from '@/lib/app';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [request, setRequest] = useState<string>('');
  const [debouncedRequest] = useDebounce(request, 800);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const { data, isError, isFetching } = useQuery({
    queryKey: ['notes', page, debouncedRequest],
    queryFn: () => fetchNotes(page, debouncedRequest),
    retry: false,
    placeholderData: prev=>prev
  });
  console.log(data);
  
  const onChangeRequest = (newRequest: string) => {
    setPage(1);
    setRequest(newRequest);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={onChangeRequest} />
        {data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            setPage={setPage}
            page={page}
          />
        )}
        <button onClick={toggleModal} className={css.button}>
          Create note +
        </button>
      </div>
    {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      {openModal && (
        <Modal
          onClose={toggleModal}
          children={<NoteForm onClose={toggleModal} />}
        />
      )}
      {data && data?.totalPages > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
