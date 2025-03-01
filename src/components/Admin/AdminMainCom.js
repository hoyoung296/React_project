import "../../css/admin/adminMain.css"

const AdminMainCom = ({ onChange, mySubmit, isAuthenticated, handleLogout }) => {
    return (
        <div className="adminMain">
            {isAuthenticated ? (
                <>
                    <p>관리자 로그인 중</p><br />
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            ) : (
                <>
                    <h1>관리자 LOGIN</h1>
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