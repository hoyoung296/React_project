import { useNavigate, useSearchParams } from "react-router-dom"
import MyReserveCom from "../../components/reserve/MyReserveCom"
import { useEffect, useState } from "react"
import { checkReview, delReserve, getReserveList, writeReview } from "../../service/reserve"

const MyReserveCon = () => {
    const [params] = useSearchParams()
    const [allList, setAllList] = useState([])
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
        const getAllData = async () => {
            try {
                const data = await getReserveList(id)
                const groupedData = data.dto?.reduce((acc, item) => {
                    const key = item.reservationId
                    if (!acc[key]) {
                        acc[key] = { ...item, seatIds: [item.seatId] }
                    } else {
                        acc[key].seatIds.push(item.seatId)
                    }
                    return acc
                }, {})
                const mergedList = Object.values(groupedData)
                setAllList(mergedList)
                setList({
                    dto: mergedList.slice(0, 5),
                    page: Math.ceil(mergedList.length / 5)
                })
            } catch (error) {
                console.error("데이터 가져오기 오류 :", error)
            }
        }
        getAllData()
    }, [id])

    useEffect(() => {
        const currentPage = parseInt(start)
        if (currentPage > list.page) {
            setStart(1)
            navigate(`/mypage/ticket?id=${id}&start=1`)
        } else {
            setList({
                dto: allList.slice((currentPage - 1) * 5, currentPage * 5),
                page: Math.ceil(allList.length / 5),
            })
        }
    }, [start, allList, list.page, id, navigate])

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
            dto: allList.slice((page - 1) * 5, page * 5),
            page: Math.ceil(allList.length / 5),
        })
        navigate(`/mypage/ticket?id=${id}&start=${page}`)
    }

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const mySubmit = async (e) => {
        e.preventDefault()
        if (!modalData) return
        const dto = {
            content: input.review,
            userId: list.dto[0]?.userId || "",
            movieId: modalData.movieId
        }
        try {
            const response = await writeReview(dto)
            if (response === 1) {
                showResult()
                setReviewStatus(prevStatus => ({
                    ...prevStatus,
                    [modalData.reservationId]: true
                }))
                setAllList(prevList => [...prevList])
            } else {
                alert("리뷰 등록 실패")
            }
            setStart(1)
            navigate(`/mypage/ticket?id=${id}&start=1`)
            hideModal()
        } catch (error) {
            alert("오류 발생: " + (error.response?.data?.message || "알 수 없는 오류"))
        }
    }

    const del = async (rsv) => {
        try {
            const response = await delReserve(rsv)
            alert(response.message)
            window.location.reload();
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
        navigate(`/mypage/review?id=${id}&start=`)
    }

    const onPayment = (data) => {
        const [date, time] = data.startDateTime.split(" ")
        const formattedTime = time.slice(0, 5)
        sessionStorage.setItem("moviePosterUrl", data.posterUrl)
        sessionStorage.setItem("movieTitle", data.title)
        sessionStorage.setItem("movieDirector", data.director)
        sessionStorage.setItem("movieActors", data.actors)
        sessionStorage.setItem("selectedDate", date)
        sessionStorage.setItem("selectedCinema", data.screenName)
        sessionStorage.setItem("selectedStartTime", formattedTime)
        sessionStorage.setItem("totalAmount", data.totalAmount)

        navigate("/payment", {
            state: {
                seatIds: data.seatIds,
                movieTitle: data.title,
                moviePosterUrl: data.posterUrl,
                movieDirector: data.director,
                movieActors: data.actors,
                selectedDate: data.startDateTime,
                selectedCinema: data.screenName,
                scheduleId: data.scheduleId,
                reservationId: data.reservationId
            }
        })
    }

    return (
        <MyReserveCom list={list} start={start} reviewStatus={reviewStatus} modalData={modalData} id={id} handlePageChange={handlePageChange} del={del}
            showModal={showModal} hideModal={hideModal} mySubmit={mySubmit} onChange={onChange} showResult={showResult} hideResult={hideResult} onResult={onResult}
            isModalOpen={isModalOpen} modalType={modalType} onPayment={onPayment} />
    )
}

export default MyReserveCon