import React from 'react';
import _ from "lodash"

const Pagination = (props) => {
    const pagesCount = Math.ceil(props.itemsCount/props.pageSize);
    
    if(pagesCount == 1)
    {
        return null;
    }

    // const pageNumbersArray = [];
    // for(var i = 0;i<pagesCount;i++)
    //     pageNumbersArray[i] = i+1;
    const pages = _.range(1, pagesCount+1);

    return(
        <nav>
            <ul className="pagination">
            {
                pages.map(page => (
                    <li key={page} className={props.currentPage === page ? "page-item active" : "page-item"} onClick= {() => props.onPageChange(page)}><a className="page-link">{page}</a></li>
                ))
            }
            </ul>
        </nav>
    );
}
 
export default Pagination;


{/* <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li className="page-item"><a class="page-link" href="#">Previous</a></li>
            <li className="page-item"><a class="page-link" href="#">1</a></li>
            <li className="page-item"><a class="page-link" href="#">2</a></li>
            <li className="page-item"><a class="page-link" href="#">3</a></li>
            <li className="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav> */}