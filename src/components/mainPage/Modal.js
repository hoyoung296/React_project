import React, { useRef, useEffect } from 'react';
import '../../css/main.css';

const Modal = ({ isOpen, onClose, type, content }) => {
    const modalBackground = useRef();

    useEffect(() => {
        console.log('모달 상태 변경:', isOpen);
    }, [isOpen]);

    if (!isOpen) return null;

    const renderContent = () => {
        switch (type) {
            case 'detail':
                return <p>{content}</p>;
            case 'review':
                return (
                    <div>
                        리뷰 작성 모달창!!
                        <button onClick={() => onClose('complete')}>작성 완료</button>
                    </div>
                );
            case 'complete':
                return <p>리뷰 저장 완료!!</p>;
            default:
                return null;
        }
    };

    return (
        <div className="modal-container" onClick={() => onClose()}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
                {renderContent()}
            </div>
        </div>
    </div>
    );
};

export default Modal;
