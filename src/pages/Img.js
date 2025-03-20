import axios from 'axios';
import React, { useState } from 'react';

function ProfilePicUpload() {
    const [imagePreview, setImagePreview] = useState(null);
    const [data, setData] = useState(null);

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

                console.log("파일 이름 : " , response.data.imagename)
                setData(response.data.imagename)
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
            }
        }
    };

    return (
        <div>
            <h2>프로필 사진 업로드</h2>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}
            <img src={`http://localhost:8080/root/upload/image?image=${data}`} alt="프사이미지"/>
        </div>
      
    );
}

export default ProfilePicUpload;