import React from 'react';
import MypageSidebar from "../common/MypageSidebar"
import '../../css/mypage.css';

function InfoCom() {
    return (
    <div className='mypage'>
        <MypageSidebar activeLink="회원정보 수정" />
        <div className='infoMain'>
            <div>
                <span>아이디
                <input
                    type="text"
                    className='infodata'
                    value={`수정불가능한 회원아이디`}
                    readOnly
                />
                </span>
                <span>닉네임
                <input
                    type="text"
                    className='infodata'
                    value={`username 기본값`}
                />
                </span>
                <span>비밀번호
                <input
                    type="text"
                    className='infodata'
                    value={`비밀번호 기본값`}
                />
                </span>
                <span>비밀번호 확인
                <input
                    type="text"
                    className='infodata'
                    value={`비밀번호확인 기본값`}
                />
                </span>
                <span>이메일
                    <input
                        type="text"
                        className='infodata'
                        value={`이메일 기본값`}
                    />
                </span>
                <span>전화번호
                    <input
                        type="text"
                        className='infodata'
                        value={`전화번호 기본값`}
                    />
                </span>
                <span>주소
                    <input
                        type="text"
                        className='infodata'
                        value={`주소 기본값`}
                    />
                </span>
                <span>상세주소
                    <input
                        type="text"
                        className='infodata'
                        value={`상세주소 기본값`}
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
                <button>저장하기</button>
            </div>
        </div>
    </div>
)
};

export default InfoCom;