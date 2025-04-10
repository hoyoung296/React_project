import { Link, useLocation, useSearchParams } from "react-router-dom"
import '../../css/review/MypageSidebar.css'
import axios from "axios"
import { useEffect, useState } from "react"

const MypageSidebar = ({ activeLink }) => {
    const [params] = useSearchParams()
    const location = useLocation()
    const userId = params.get("id")
    const [userData, setUserData] = useState(null)
    const customLinks = location.pathname.includes("review")
        ? [
            { to: `/mypage/ticket?id=${userId}&start=`, text: "내 예매내역" },
            { to: "/mypage/review", text: "내 리뷰" },
            { to: `/mypage/info/confirm?id=${userId}`, text: "회원정보 수정" }
        ]
        : location.pathname.includes("ticket") ? [
            { to: "/mypage/ticket", text: "내 예매내역" },
            { to: `/mypage/review?id=${userId}&start=`, text: "내 리뷰" },
            { to: `/mypage/info/confirm?id=${userId}`, text: "회원정보 수정" }
        ] :
            [
                { to: `/mypage/ticket?id=${userId}&start=`, text: "내 예매내역" },
                { to: `/mypage/review?id=${userId}&start=`, text: "내 리뷰" },
                { to: "/mypage/info/confirm", text: "회원정보 수정" }
            ]
    
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/root/info?userId=${userId}`)
                setUserData(res.data)
                console.log("data확인 : " , res.data)
            } catch (error) {
                console.error("유저 정보 불러오기 실패: ", error)
            }
        }

        if (userId) getList()
    }, [userId])

    return <>
        <div className="SidebarDiv">
            {userData &&  <img src={`${process.env.REACT_APP_BACKEND_URL}/root/upload/image?image=${userData.data.profileImage}`} alt="profileImg" />}<br />
            {userData &&  <b>{userData.data.userName}</b>}
            {customLinks.map((link, index) => (
                <p key={index}>
                    {activeLink === link.text ? (
                        <span><b>{link.text}</b></span>
                    ) : (
                        <Link to={link.to}><b>{link.text}</b></Link>
                    )}
                </p>
            ))}
        </div>
    </>
}

export default MypageSidebar