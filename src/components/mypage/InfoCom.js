import React, { useState, useEffect } from 'react';
import MypageSidebar from "../common/MypageSidebar"
import '../../css/mypage.css';
import axios from 'axios';

function InfoCom() {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        username: '',
        password: '',
        confirmPassword: '',
        newPassword: '',
        email: '',
        phoneNumber: '',
        postnum: '',
        addr: '',
        detailAddr: '',
        userGrade: '',
        userBirthday: ''
    });

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        async function fetchUserData() {
            try {
                const { data } = await axios.get(`http://localhost:8080/root/info?userId=${userId}`);
                setUserInfo({
                    userId: data.userId,
                    username: data.username,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    newPassword: data.newPassword,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    postnum: data.postnum,
                    addr: data.addr,
                    detailAddr: data.detailAddr,
                    userGrade: data.userGrade,
                    userBirthday: data.userBirthday
                });
                console.log("불러온 회원정보 : ", data)
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

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:8080/root/update', {
                userId: userInfo.userId,
                password: userInfo.password, 
                newPassword: userInfo.newPassword,
                phoneNumber: userInfo.phoneNumber,
                addr: userInfo.addr,
                detailAddr: userInfo.detailAddr
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                console.log("수정된 회원 정보:", response.data);
                alert('회원 정보가 업데이트되었습니다.');
            } else {
                alert('업데이트 실패');
            }
        } catch (error) {
            console.error('업데이트 중 오류 발생:', error);
            alert('업데이트 중 오류가 발생했습니다.');
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
                <span><span>비밀번호</span>
                <input
                    type="password"
                    className='infodata'
                    name="password"
                    value={userInfo.password}
                    onChange={handleChange}
                />
                </span>
                <span><span>비밀번호 확인</span>
                <input
                    type="password"
                    className='infodata'
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleChange}
                />
                </span>
                <span><span>이메일</span>
                    <input
                        type="email"
                        className='infodata'
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
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
                    <input
                        type="text"
                        className='infodata'
                        name="addr"
                        value={userInfo.addr}
                        onChange={handleChange}
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
                <button>탈퇴하기</button>
            </div>
            <div>
                <img src='../../img/img.png'/>
                <input
                    type='file'
                    accept='image/*'
                />
                <button onClick={handleSave}>저장하기</button>
            </div>
        </div>
    </div>
)
};

export default InfoCom;