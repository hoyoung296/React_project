import { Link, useLocation, useSearchParams } from "react-router-dom"
import '../../css/review/MypageSidebar.css'

const MypageSidebar = ({ activeLink }) => {
    const [params] = useSearchParams()
    const paramId = params.get("id")
    const location = useLocation()
    const userId = paramId
    const customLinks = location.pathname.includes("myReview")
        ? [
            { to: userId ? `/myTicket?id=${userId}&start=` : `/myTicket?id=${paramId}&start=`, text: "내 예매내역" },
            { to: "/myReview", text: "내 리뷰" },
            { to: userId ? `/info_pwd?id=${userId}` : `/info_pwd?id=${paramId}`, text: "회원정보 수정" }
        ]
        : location.pathname.includes("myTicekt") ? [
            { to: "/myTicket", text: "내 예매내역" },
            { to: userId ? `/myReview?id=${userId}&start=` : `/myReview?id=${paramId}&start=`, text: "내 리뷰" },
            { to: userId ? `/info_pwd?id=${userId}` : `/info_pwd?id=${paramId}`, text: "회원정보 수정" }
        ] :
            [
                { to: userId ? `/myTicket?id=${userId}&start=` : `/myTicket?id=${paramId}&start=`, text: "내 예매내역" },
                { to: userId ? `/myReview?id=${userId}&start=` : `/myReview?id=${paramId}&start=`, text: "내 리뷰" },
                { to: "/info_pwd", text: "회원정보 수정" }
            ]

    return <>
        <div className="SidebarDiv">
            <img src="/img/movie1.jpg" alt="프사" /><br />
            <b>{userId || paramId}</b>
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