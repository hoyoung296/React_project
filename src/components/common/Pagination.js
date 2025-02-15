import React from "react"
import "../../css/review/Pagination.css"

const Pagination = ({ start, list, handlePageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= list.page; i++) {
            pageNumbers.push(
                <button
                    className="PagingButton"
                    key={i}
                    onClick={() => handlePageChange(i)}
                >
                    [{i}]
                </button>
            )
        }
        return pageNumbers
    }

    return (
        <div className="PagingDiv">
            {start > 1 && (
                <button onClick={() => handlePageChange(start - 1)}>이전</button>
            )}

            {renderPageNumbers()}

            {start < list.page && (
                <button onClick={() => handlePageChange(start + 1)}>다음</button>
            )}
        </div>
    )
}

export default Pagination