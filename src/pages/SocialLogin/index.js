import { useNavigate, useSearchParams } from 'react-router-dom'
import http from '../../utils/http'

export default function SocialLogin() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  if (!sessionId) return navigate('/')

  http
    .get(`/api/user/getUserBySessionToken?session_id=${sessionId}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })

  return 'Loading...'
}
