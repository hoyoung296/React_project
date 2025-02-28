import "../../css/admin/adminMain.css"
const AdminMainCom = ({onChange, mySubmit}) => {
    return <>
        <div className="adminMain">
            <h1>관리자LOGIN</h1><br />
            <form onSubmit={mySubmit}>
                <input type="text" name="id" placeholder="아이디를 입력해주세요" onChange={onChange} /><br /><br />
                <input type="text" name="pwd" placeholder="비밀번호를 입력해주세요" onChange={onChange} /><br /><br />
                <button>로그인</button>
            </form>
        </div>
    </>
}

export default AdminMainCom