import { useSearchParams } from "react-router-dom"
import SearchCom from "../../components/review/SearchCom"
import { useEffect, useState } from "react"
import { getSearchList } from "../../service/review"

const SearchCon = () => {
    const [params] = useSearchParams() // URL 쿼리 파라미터 가져오기
    const [list, setList] = useState([])

    useEffect(() => {
        const id = params.get("id") // URL에서 id 값 가져오기
        if (!id) {
            console.error("유효한 ID가 없습니다.")
            return
        }

        const getData = async () => {
            try {
                const data = await getSearchList(id) // id를 전달하여 데이터 가져오기
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [params]) // params가 변경될 때마다 다시 실행

    return <>
        <SearchCom list={list} id={params.get("id")} />
    </>
}

export default SearchCon
