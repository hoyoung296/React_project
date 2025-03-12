import { Link, useLocation, useSearchParams } from "react-router-dom"
import '../../css/review/MypageSidebar.css'

const MypageSidebar = ({ activeLink }) => {
    const [params] = useSearchParams()
    const location = useLocation()

    // localStorage에서 user 정보 가져오기
    const storedUser = localStorage.getItem("user")
    const userData = storedUser ? JSON.parse(storedUser) : null
    const username = userData?.username || "사용자"
    const userId = params.get("id")
    const customLinks = location.pathname.includes("myReview")
        ? [
            { to: `/mypage/ticket?id=${userId}&start=`, text: "내 예매내역" },
            { to: "/mypage/review", text: "내 리뷰" },
            { to: `/mypage/info/confirm?id=${userId}`, text: "회원정보 수정" }
        ]
        : location.pathname.includes("myTicekt") ? [
            { to: "/mypage/ticket", text: "내 예매내역" },
            { to: `/mypage/review?id=${userId}&start=`, text: "내 리뷰" },
            { to: `/mypage/info/confirm?id=${userId}`, text: "회원정보 수정" }
        ] :
            [
                { to: `/mypage/ticket?id=${userId}&start=`, text: "내 예매내역" },
                { to: `/mypage/review?id=${userId}&start=`, text: "내 리뷰" },
                { to: "/mypage/info/confirm", text: "회원정보 수정" }
            ]

    return <>
        <div className="SidebarDiv">
            <img src="/img/movie1.jpg" alt="프사" /><br />
            <b>{username}</b>
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