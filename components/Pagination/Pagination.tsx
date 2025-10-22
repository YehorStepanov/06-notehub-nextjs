
import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps{
    totalPages: number,
    setPage: (number: number)=> void,
    page: number
}
export default function Pagination({totalPages, setPage, page}: PaginationProps){
    return <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
}