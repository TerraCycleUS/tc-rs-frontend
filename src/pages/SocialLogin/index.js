import { useNavigate, useSearchParams } from 'react-router-dom'
import http from '../../utils/http'

export default function SocialLogin() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  if (!sessionId) return navigate('/')

  http
    .get(`/api/user/getUserBySessionToken?session_id=${sessionId}`)
    .then(({ data }) => {
      if (data.status === 'INVITED') {
        return navigate('email-setup', {
          replace: true,
          state: { email: data.email, sessionId },
        })
      }

      return navigate('/', { replace: true })
    })
    .catch((error) => {
      console.log(error)
    })

  return 'Loading...'
}
