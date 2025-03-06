import { useNavigate, useSearchParams } from "react-router-dom"
import MyReserveCom from "../../components/review/MyReserveCom"
import { useEffect, useState } from "react"
import { checkReview, delReserve, getReserveList, writeReview } from "../../service/review"

const MyReserveCon = () => {
    const [params] = useSearchParams()
    const [allList, setAllList] = useState([]) // 모든 데이터 저장
    const [list, setList] = useState({ dto: [], page: 0 }) // 현재 페이지 데이터
    const [start, setStart] = useState(params.get("start") || 1)
    const [modalData, setModalData] = useState(null)
    const [input, setInput] = useState({ review: "" })
    const [reviewStatus, setReviewStatus] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)
    const id = params.get("id")

    const navigate = useNavigate()

    useEffect(() => {
        const getAllData = async () => {
            try {
                let allData = []
                let page = 1
                while (true) {
                    const data = await getReserveList(id, page)
                    if (!data.dto.length) break
                    allData = [...allData, ...data.dto]
                    page++
                }

                // 같은 reservationId끼리 묶어서 새로운 리스트 생성
                const groupedData = {}
                allData.forEach(item => {
                    const key = item.reservationId
                    if (!groupedData[key]) {
                        groupedData[key] = { ...item, seatIds: [item.seatId] }
                    } else {
                        groupedData[key].seatIds.push(item.seatId)
                    }
                })

                const mergedList = Object.values(groupedData)

                setAllList(mergedList) // 전체 리스트 저장
                setList({
                    dto: mergedList.slice(0, 5), // 첫 페이지 데이터
                    page: Math.ceil(mergedList.length / 5) // 페이지 재정의
                })
            } catch (error) {
                console.error("데이터 가져오기 오류 :", error)
            }
        }
        getAllData()
    }, [id])

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
            for (const data of allList) {
                const review = await checkReview(data.userId, data.movieId)
                status[data.reservationId] = review
            }
            setReviewStatus(status)
        }

        if (allList.length > 0) {
            fetchReviewStatus()
        }
    }, [allList])

    const handlePageChange = (page) => {
        setStart(page)
        setList({
            dto: allList.slice((page - 1) * 5, page * 5), // 5개씩 끊어서 페이지 데이터 설정
            page: Math.ceil(allList.length / 5) // 전체 페이지 수 재계산
        })
        navigate(`/myTicket?id=${id}&start=${page}`)
    }

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const mySubmit = async (e) => {
        e.preventDefault()
        if (!modalData) return // modalData가 없을 경우 예외 처리

        const dto = {
            content: input.review,
            userId: list.dto[0]?.userId || "", // userId가 없을 경우 대비
            movieId: modalData.movieId
        }

        try {
            const response = await writeReview(dto)
            if (response === 1) {
                showResult()
            } else {
                alert("리뷰 등록 실패")
            }
            setStart(1)
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
            setStart(1)
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
        if (elements.length > 0) elements[0].style.display = "block"
    }

    const hideResult = () => {
        const elements = document.getElementsByClassName("Resultmodal")
        if (elements.length > 0) elements[0].style.display = "none"
        setModalData(null)
    }

    const onResult = () => {
        navigate(`/myReview?id=${id}&start=`)
    }

    return (
        <MyReserveCom list={list} start={start} reviewStatus={reviewStatus} modalData={modalData} id={id} handlePageChange={handlePageChange} del={del}
            showModal={showModal} hideModal={hideModal} mySubmit={mySubmit} onChange={onChange} showResult={showResult} hideResult={hideResult} onResult={onResult}
            isModalOpen={isModalOpen} modalType={modalType} />
    )
}

export default MyReserveCon