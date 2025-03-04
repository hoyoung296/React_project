import "../../css/admin/adminMain.css"

const AdminMainCom = ({ onChange, mySubmit, isAuthenticated, handleLogout }) => {
    return (
        <div className="adminMain">
            {isAuthenticated ? (
                <>
                    <p>관리자 로그인 중입니다.</p><br />
                    <button onClick={handleLogout} className="logoutBtn">로그아웃</button>
                </>
            ) : (
                <>
                    <p>[ THEFILLM 관리자페이지 ]</p>
                    <br />
                    <form onSubmit={mySubmit}>
                        <input type="text" name="id" placeholder="아이디를 입력해주세요" onChange={onChange} />
                        <br />
                        <br />
                        <input type="password" name="pwd" placeholder="비밀번호를 입력해주세요" onChange={onChange} />
                        <br />
                        <br />
                        <button>로그인</button>
                    </form>
                </>
            )}
        </div>
    )
}

export default AdminMainCom