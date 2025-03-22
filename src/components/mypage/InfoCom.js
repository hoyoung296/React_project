import React, { useState, useEffect } from 'react';
import MypageSidebar from "../common/MypageSidebar"
import '../../css/mypage.css';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function InfoCom() {
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState({
        userId: '',
        userName: '',
        password: '',
        confirmPassword: '',
        newPassword: '',
        email: '',
        phoneNumber: '',
        postNum: '',
        addr: '',
        detailAddr: '',
        userGrade: '',
        userBirthday: '',
        profileImage:''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imagefile, setImagefile] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // 미리보기 표시
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // FormData 생성
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("http://localhost:8080/root/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }, // 🔥 추가해야 함
                });

                console.log("파일 이름 : ", response.data.imagename)
                setImagefile(response.data.imagename);
                setUserInfo((prev) => ({
                    ...prev,
                    profileImage: response.data.imagename, // 🔥 userInfo도 업데이트
                }));
            } catch (error) {
                console.error("프로필 업로드 실패:", error);
            }
        }
    };
    const handleDeleteImage = async () => {
        if (!userInfo.profileImage || userInfo.profileImage === "default.png") {
            alert("기본 프로필입니다.");
            return; // 요청을 보내지 않음
        }
        if (window.confirm("프로필을 삭제하시겠습니까?")) {
            try {
                const response = await axios.delete('http://localhost:8080/root/upload/del', {
                    params: { image: userInfo.profileImage }, // URL 파라미터로 전달
                    headers: { 'Content-Type': 'application/json' }
                });
    
                if (response.status === 200) {
                    alert("프로필이 삭제되었습니다.");
                    setImagefile(null); // 로컬 상태에서 이미지 파일 초기화
                    setUserInfo({
                        ...userInfo,
                        profileImage: 'default.png' // 프로필 이미지 초기화
                    });
                } else {
                    alert("프로필 삭제 실패");
                }
            } catch (error) {
                console.error("프로필 삭제 오류:", error);
                alert("프로필 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const [params] = useSearchParams()
    const userId = params.get("id")

    useEffect(() => {
        // script 태그를 동적으로 추가
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        // cleanup: 컴포넌트가 언마운트될 때 script 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const { data } = await axios.get(`http://localhost:8080/root/info?userId=${userId}`);
                if (data.data.username === undefined) {
                    data.data.username = data.data.userName;
                }

                //console.log("백엔드에서 받아온 생년월일:", data.data.userBirthday); // 🔥 확인용 로그

                let formattedBirthday = '';
                if (data.data.userBirthday && data.data.userBirthday.length === 8) {
                    formattedBirthday = `${data.data.userBirthday.slice(0, 4)}-${data.data.userBirthday.slice(4, 6)}-${data.data.userBirthday.slice(6, 8)}`;
                } else {
                    formattedBirthday = data.data.userBirthday || '';
                }

                //console.log("변환된 생년월일:", formattedBirthday); // 🔥 변환된 값 확인

                setUserInfo({
                    userId: data.data.userId || '',
                    username: data.data.username || '',
                    password: data.data.password || '',
                    confirmPassword: data.data.confirmPassword || '',
                    newPassword: data.data.newPassword || '',
                    email: data.data.email || '',
                    phoneNumber: data.data.phoneNumber || '',
                    postNum: data.data.postNum || '',
                    addr: data.data.addr || '',
                    detailAddr: data.data.detailAddr || '',
                    userGrade: data.data.userGrade || '',
                    userBirthday: formattedBirthday, // 👈 변환된 값 적용
                    profileImage : data.data.profileImage
                });
            } catch (error) {
                console.error('사용자 정보를 불러오는 중 오류 발생:', error);
            }
        }
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    // 주소 검색 기능
    const handlePostcodeSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                let addr = ''; // 주소 변수

                if (data.userSelectedType === 'R') { // 도로명 주소
                    addr = data.roadAddress;
                } else { // 지번 주소
                    addr = data.jibunAddress;
                }
                console.log("주소 검색 결과:", addr); // 검색된 주소 확인
                console.log("우편번호:", data.zonecode); // 검색된 우편번호 확인

                setUserInfo({
                    ...userInfo,
                    postNum: data.zonecode,
                    addr: addr,
                    detailAddr: '' // 상세주소는 빈 값으로 초기화
                });
                // 업데이트된 상태 확인
                console.log("업데이트된 userInfo:", {
                    ...userInfo,
                    postNum: data.zonecode,
                    addr: addr
                });
            }
        }).open();

    };

    const validateInputs = () => {
        // 비밀번호 유효성 검사 (최소 8자 이상, 영문/숫자/특수문자 포함)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (userInfo.newPassword && !passwordRegex.test(userInfo.newPassword)) {
            setErrorMessage(<>비밀번호는 최소 8자 이상이며,<br />영문/숫자/특수문자를 포함해야 합니다.</>);
            return false;
        }

        if (userInfo.newPassword !== userInfo.confirmPassword) {
            setErrorMessage("비밀번호 확인이 일치하지 않습니다.");
            return false;
        }

        // 전화번호 유효성 검사 (숫자만 입력)
        const phoneRegex = /^\d{10,11}$/; // 10~11자리 숫자만 허용 (예: 01012345678)

        if (!phoneRegex.test(userInfo.phoneNumber)) {
            setErrorMessage("전화번호는 하이픈(-) 없이 숫자만 입력해야 합니다.");
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateInputs()) return; // 유효성 검사 실패 시 종료

        // userBirthday 값과 타입 확인
        console.log("🔍 userInfo.userBirthday 값:", userInfo.userBirthday);
        console.log("🔍 userInfo.userBirthday 타입:", typeof userInfo.userBirthday);
        const formattedBirthday = userInfo.userBirthday ? String(userInfo.userBirthday).replace(/-/g, '') : '';


        console.log("저장하려는 데이터:", { ...userInfo, userBirthday: formattedBirthday }); // 변환된 값 확인
        console.log("프사 확인 : ", imagefile)

        try {
            const response = await axios.put('http://localhost:8080/root/update', {
                userId: userInfo.userId,
                userName: userInfo.username,
                password: userInfo.password,
                newPassword: userInfo.newPassword,
                confirmPassword: userInfo.confirmPassword,
                phoneNumber: userInfo.phoneNumber,
                postNum: userInfo.postNum,
                addr: userInfo.addr,
                detailAddr: userInfo.detailAddr,
                userBirthday: formattedBirthday,
                profileImage: imagefile || userInfo.profileImage // 새로 업로드된 이미지가 없다면 기존 이미지 사용
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                console.log("수정된 회원 정보:", response.data);
                alert('회원 정보가 업데이트되었습니다.');
                navigate("/")
            } else {
                alert('업데이트 실패');
            }
        } catch (error) {
            console.error('업데이트 중 오류 발생:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        }
    };

    const delId = async () => {
        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 후에는 복구할 수 없습니다.");
        if (!isConfirmed) return;

        console.log("실행")
        try {
            const response = await axios.delete('http://localhost:8080/root/delete', {
                data: {
                    userId: userId,
                    password: userInfo.password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message)
            navigate("/login")
        } catch (error) {
            console.error('회원 탈퇴 실패:', error);
        }
    };

    return (
        <div className='mypage'>
            <MypageSidebar activeLink="회원정보 수정" />
            <div className='infoMain'>
                <div>
                    <span><span>아이디</span>
                        <input
                            type="text"
                            className='infodata'
                            value={userInfo.userId || ''}
                            readOnly
                        />
                    </span>
                    <span><span>닉네임</span>
                        <input
                            type="text"
                            className='infodata'
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                        />
                    </span>
                    <span><span>변경할 비밀번호</span>
                        <div className="pwdImgBtn">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className='pwdImgBtnNew'
                                name="newPassword"
                                value={userInfo.newPassword}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                                <img src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                        </div>
                    </span>
                    <span><span>비밀번호 확인</span>
                        <div className="pwdImgBtn">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                className='pwdImgBtnNew'
                                name="confirmPassword"
                                value={userInfo.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <img src={confirmPasswordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                        </div>
                    </span>
                    <span><span>전화번호</span>
                        <input
                            type="text"
                            className='infodata'
                            name="phoneNumber"
                            value={userInfo.phoneNumber}
                            onChange={handleChange}
                        />
                    </span>
                    <span><span>주소</span>
                        <div className="pwdImgBtn">
                            <input
                                type="text"
                                className='pwdImgBtnNew'
                                name="postNum"
                                value={userInfo.postNum}
                                readOnly
                                onChange={handleChange} />
                            <button type="button" onClick={handlePostcodeSearch}>
                                <img src='../../img/search.png' /></button>
                        </div>
                    </span>
                    <span><span></span>
                        <input
                            type="text"
                            className='infodata'
                            name="addr"
                            value={userInfo.addr}
                            onChange={handleChange} readOnly
                        />
                    </span>
                    <span><span>상세주소</span>
                        <input
                            type="text"
                            className='infodata'
                            name="detailAddr"
                            value={userInfo.detailAddr}
                            onChange={handleChange}
                        />
                    </span>
                    <span><span>생년월일</span>
                        <input
                            type="text"
                            className="infodata"
                            name="userBirthday"
                            value={userInfo.userBirthday || ''}
                            onChange={handleChange}
                            onFocus={(e) => (e.target.type = "date")}  // 클릭 시 달력 표시
                            onBlur={(e) => (e.target.type = "text")}  // 포커스 해제 시 다시 placeholder 표시
                            required
                        />
                    </span>


                    {errorMessage &&
                        <div className="error_message" key={errorMessage}>
                            {errorMessage}
                        </div>}
                    <button className='saveBtn' onClick={handleSave}>저장하기</button>
                    <button className='delBtn' onClick={delId}>탈퇴하기</button>
                </div>
                <div>
                    {console.log("기존 이미지 확인 : " ,userInfo.profileImage)}
                    {console.log("새 이미지 확인 : " ,imagefile)}
                    {imagefile === null
                        ? <img src={`http://localhost:8080/root/upload/image?image=${userInfo.profileImage}`} alt="profile" />
                        : <img src={`http://localhost:8080/root/upload/image?image=${imagefile}`} alt="profile" />
                    }

                    <input
                        type='file'
                        onChange={handleFileChange}
                        accept='image/*'
                    />
                    {userInfo.profileImage && (
                        <button className='deleteBtn' onClick={handleDeleteImage}>
                            프로필 삭제
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
};

export default InfoCom;