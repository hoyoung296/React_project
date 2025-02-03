import { useSearchParams } from "react-router-dom"
import SearchCom from "../../components/review/SearchCom"
import { useEffect, useState } from "react"
import { getSearchList } from "../../service/review"

const SearchCon = () => {
    const [params] = useSearchParams()
    const [list, setList] = useState([])
    useEffect(()=>{
        const getData = async () => {
            try{
                const data= await getSearchList(params.get("id"))
                setList(data)
            } catch (error){
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    },[params.get("id")])

    return<>
       <SearchCom list={list} id={params.get("id")}/>
    </>
}

export default SearchCon