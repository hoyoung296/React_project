import React from "react"
import "../../css/review/Pagination.css"

const Pagination = ({ start, list, handlePageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = []
        let pageStart = start - 1
        let pageEnd = start + 1

        if (list.page <= 3) {
            // 2. 3페이지 이하일 경우, 양 옆에 이전, 다음 버튼 안보이도록
            pageStart = 1
            pageEnd = list.page
        }

        if (list.page > 3) {
            if (start === 1) {
                pageEnd = 3
            } else if (start === list.page) {
                pageStart = list.page - 2
            }
        }

        pageStart = Math.max(1, pageStart)

        // 페이지 번호 생성
        for (let i = pageStart; i <= pageEnd; i++) {
            pageNumbers.push(
                <button
                    className={`PagingButton ${i === start ? "active" : ""}`} // 현재 페이지에 active 클래스 추가
                    key={i}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            )
        }
        return pageNumbers
    }

    // 1페이지 밖에 없을 경우 페이지네이션이 안보이도록
    if (list.page === 1) {
        return null // 페이지네이션을 아예 렌더링 하지 않음
    }

    return (
        <div className="PagingDiv">
            {start > 1 && list.page > 3 && (
                <button className="ArrowButton" onClick={() => handlePageChange(start - 1)}>{'<'}</button> // 이전 버튼
            )}

            {renderPageNumbers()}

            {start < list.page && list.page > 3 && (
                <button className="ArrowButton" onClick={() => handlePageChange(start + 1)}>{'>'}</button> // 다음 버튼
            )}
        </div>
    )
}

export default Pagination