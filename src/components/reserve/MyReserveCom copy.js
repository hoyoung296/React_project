                            <div className="ReserveDiv" key={data.reservationId}>
                                <div className="ReserveInfoPart1Div">
                                    <img src={`${data.posterUrl}`} alt="영화 포스터 이미지" />
                                    <b>{data.title}</b>
                                </div>
                                <div className="ReserveInfoPart2Div">
                                    <p><b>예매번호 : {data.reservationId}</b>&nbsp;&nbsp;&nbsp;&nbsp;</p><br />
                                    <p><b>상영관 : {data.screenName}</b></p><br />
                                    <p><b>관람일 : {data.startDateTime}</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>좌석 : {data.seatIds.join(", ")}</b></p><br />
                                    <p><b>{data.reservationStatusId === 1 ? "결제 대기 중입니다." : ""}</b></p>
                                </div>
                                {list != null && (
                                    <div className="ReserveInfoPart3Div">
                                        {showReviewButton && hasReview && data.paymentId !== undefined && <button onClick={() => showModal(data.title, data.posterUrl, data.director, data.actors, data.movieId)}>리뷰 쓰기</button>}
                                        {showCancelButton && data.paymentId !== undefined && <button onClick={() => del(data.reservationId)}>예매 취소</button>}
                                        {data.paymentId === undefined && <button onClick={() => onPayment(data)}>결제 진행</button>}
                                    </div>
                                )}

<div key={data.reservationId}>
    <div>
        <img src={`${data.posterUrl}`} alt={`${data.title}`}/>
        <p>{data.title}</p>
    </div>
    <div>
        <p>예매번호 : {data.reservationId}</p>
        <p>상영관 : {data.screenName}</p>
        <p>관람일 : {data.startDateTime}</p>
        <p>좌석 : {data.seatIds.join(", ")}</p>
        <p>{data.reservationStatusId === 1 ? "결제 대기 중입니다." : ""}</p>
    </div>
    {list != null && (
        <div className="ReserveInfoPart3Div">
            {showReviewButton && hasReview && data.paymentId !== undefined && 
                <button onClick={() => showModal(data.title, data.posterUrl, data.director, data.actors, data.movieId)}>리뷰 쓰기</button>}
            {showCancelButton && data.paymentId !== undefined && 
                <button onClick={() => del(data.reservationId)}>예매 취소</button>}
            {data.paymentId === undefined && 
                <button onClick={() => onPayment(data)}>결제 진행</button>}
        </div>
    )}
</div>


































</div>