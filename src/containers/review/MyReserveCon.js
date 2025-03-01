import { useNavigate, useSearchParams } from "react-router-dom"
import MyReserveCom from "../../components/review/MyReserveCom"
import { useEffect, useState } from "react"
import { checkReview, delReserve, getReserveList, writeReview } from "../../service/review"

const MyReserveCon = () => {
    const [params] = useSearchParams()
    const [list, setList] = useState({ dto: [], page: 0 })
    const [start, setStart] = useState(params.get("start") || 1)
    const [modalData, setModalData] = useState(null)
    const [input, setInput] = useState({ review: "" })
    const [reviewStatus, setReviewStatus] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)
    const id = params.get("id")

    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReserveList(id, start)

                // 같은 scheduleId끼리 묶어서 새로운 리스트 생성
                const groupedData = {}
                data.dto.forEach(item => {
                    const key = item.scheduleId
                    if (!groupedData[key]) {
                        groupedData[key] = { ...item, seatIds: [item.seatId] }
                    } else {
                        groupedData[key].seatIds.push(item.seatId)
                    }
                })

                setList({ dto: Object.values(groupedData), page: data.page })
            } catch (error) {
                console.error("데이터 가져오기 오류 :", error)
            }
        }
        getData()
    }, [id, start])

    useEffect(() => {
        if (modalData) {
            const elements = document.getElementsByClassName("Reservemodal")
            if (elements.length > 0) {
                elements[0].style.display = "block"
            }
        }
    }, [modalData])

    useEffect(() => {
        const fetchReviewStatus = async () => {
            const status = {}
            for (const data of list.dto) {
                const review = await checkReview(data.userId, data.movieId);
                status[data.reservationId] = review;
            }
            setReviewStatus(status)
        }

        if (list.dto.length > 0) {
            fetchReviewStatus()
        }
    }, [list])

    const handlePageChange = (page) => {
        setStart(page)
        navigate(`/myTicket?id=${id}&start=${page}`)
    }

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const mySubmit = async (e) => {
        e.preventDefault()
        const dto = {
            content: input.review,
            userId: list.dto[0].userId,
            movieId: modalData.movieId
        }

        try {
            const response = await writeReview(dto)
            console.log("확인 : " , response)
            if (response === 1) {
                showResult()
            }
            else {
                alert("리뷰 등록 실패")
            }
            setStart(prev => prev === 1 ? 0 : 1)
            navigate(`/myTicket?id=${id}&start=1`)
            hideModal()
        } catch (error) {
            alert("오류 발생: " + (error.response?.data?.message || "알 수 없는 오류"))
        }
    }

    const del = async (rsv) => {
        try {
            const response = await delReserve(rsv)
            alert(response.message)
            setStart(prev => prev === 1 ? 0 : 1)
            navigate(`/myTicket?id=${id}&start=1`)
        } catch (error) {
            alert("오류 발생: " + (error.response?.data?.message || "알 수 없는 오류"))
        }
    }

    const showModal = (title, posterUrl, director, actors, movieId) => {
        setModalData({ title, posterUrl, director, actors, movieId })
        setModalType("review")
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
        setModalType(null)
    }

    const showResult = () => {
        const elements = document.getElementsByClassName("Resultmodal")
        if (elements.length > 0)
            elements[0].style.display = "block"
    }

    const hideResult = () => {
        const elements = document.getElementsByClassName("Resultemodal")
        if (elements.length > 0)
            elements[0].style.display = "none"
        setModalData(null)
    }

    const onResult = () => {
        navigate(`/myReview?id=${id}&start=`)
    }

    return <>
        <MyReserveCom
            list={list} start={start} reviewStatus={reviewStatus} modalData={modalData} id={id}
            handlePageChange={handlePageChange} del={del} showModal={showModal} hideModal={hideModal} mySubmit={mySubmit} onChange={onChange}
            showResult={showResult} hideResult={hideResult} onResult={onResult} isModalOpen={isModalOpen} modalType={modalType}  />
    </>
}

export default MyReserveCon