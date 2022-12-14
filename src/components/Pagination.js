import React from 'react';

const Pagination = (props) => {
    
    const num_pages = props?.data?.last_page;
    let pages = [];
    for (let page = 1; page <= num_pages; page++) {
        pages.push(
            <li key={page} className={`page-item ${props?.data?.current_page === page ? "active" : ""}`}>
                <button className="page-link" onClick={(e) => props.handlePagination(e, page)}>
                    {page}
                </button>
            </li>
        );
    }

    return (
        <>
            {(props.data && props.data.total > props.data.per_page) &&
                <nav aria-label="">
                    <ul className="pagination float-end mb-0" id="pagination">
                        <li className={`page-item ${props.data.current_page === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={(e) => props.handlePagination(e, props.data.current_page-1)}>Previous</button>
                        </li>

                        {pages}
                        
                        <li className={`page-item ${props.data.current_page < props.data.last_page ? "" : "disabled"}`}>
                            <button className="page-link" onClick={(e) => props.handlePagination(e, props.data.current_page+1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}

export default Pagination;