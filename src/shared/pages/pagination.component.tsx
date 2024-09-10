import ReactPaginate from "react-paginate";

export interface PagingModel {
    currentPage: number;
    totalPages: number;
    itemsPerPage?: number | any;
    totalElements?: number;
    onPageChange: any;
}

export class PagingModelClass implements PagingModel {
    currentPage: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    itemsPerPage: number = 7; // total number of records in one page
    onPageChange: any;
}

const CustomPagination = ({ currentPage, totalPages, onPageChange }: PagingModel) => {
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => onPageChange(selected)}
            forcePage={currentPage} // react-paginate uses 0-based index
            previousLabel={<span>&lt;</span>} // Changed to < symbol
            nextLabel={<span>&gt;</span>} // Changed to > symbol
            breakLabel={<span>...</span>}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            disabledClassName={'disabled'}
        />
    );
}

export default CustomPagination;

