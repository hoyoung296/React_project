import { useState } from "react"
import HeaderCom from "../../components/common/HeaderCom"
import { useNavigate } from "react-router-dom"

const HeaderCon = () => {
    const navigate =useNavigate()
    const [input, setInput] = useState({search : ""})
    const onChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }

    const mySubmit = (e) => {
        e.preventDefault()
        navigate(input.search ? `/search?id=${input.search}` : "/search")
    }

    return<>
        <HeaderCom input={input} onChange={onChange} mySubmit={mySubmit} />
    </>
}
export default HeaderCon