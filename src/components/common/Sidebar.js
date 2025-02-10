import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarDiv = styled.div`
    width: 20%;
    height: 800px;
    text-align: center;
`;

const Sidebar = ({ customLinks, activeLink, userId, paramId }) => {

    return (
        <SidebarDiv>
            <img
                src="/img/movie1.jpg"
                alt="프사"
                style={{
                    width: "30%",
                    height: "30%",
                    borderRadius: "50%",
                    display: "block",
                    margin: "0 auto",
                    marginTop: "20%",
                }}
            />
            {userId ? <b>{userId}</b> : <b>{paramId}</b>}
            {customLinks.map((link, index) => (
                <p key={index} style={{ display: "block", marginTop: "15%" }}>
                    {activeLink === link.text ? (
                        <span style={{ fontSize: "20px", color: "purple" }}>
                            <b>{link.text}</b>
                        </span>
                    ) : (
                        <Link
                            to={link.to}
                            style={{ fontSize: "20px", color: "white", textDecoration: "none" }}
                        >
                            <b>{link.text}</b>
                        </Link>
                    )}
                </p>
            ))}
        </SidebarDiv>
    )
}

export default Sidebar;