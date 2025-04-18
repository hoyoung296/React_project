import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OAuthCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    if (code) {
      console.log('인가 코드:', code)
      // TODO: 백엔드 서버에 인가 코드를 전송하여 액세스 토큰 요청 등 추가 로직 수행
      navigate('/')
    } else {
      console.error('인가 코드가 전달되지 않았습니다.')
    }
  }, [location, navigate])

  return (
    <div>
      <p>로그인 중입니다...</p>
    </div>
  )
}

export default OAuthCallback