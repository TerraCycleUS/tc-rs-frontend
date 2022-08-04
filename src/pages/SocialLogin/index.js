import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import http from '../../utils/http'
import { setUser } from '../../actions/user'
import useApiCall from '../../utils/useApiCall'

export default function SocialLogin() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const dispatch = useDispatch()
  const sessionId = params.get('session_id')
  const authToken = params.get('authorization')
  const apiCall = useApiCall()

  const handler = async () => {
    if (sessionId) {
      const { data } = await http.get(
        `/api/user/getUserBySessionToken?session_id=${sessionId}`,
      )
      if (data.status === 'INVITED') {
        return navigate(
          {
            pathname: 'email-setup',
            search: queryString.stringify({ email: data.email, sessionId }),
          },
          { replace: true },
        )
      }
    } else if (authToken) {
      const user = { ...jwtDecode(authToken), authorization: authToken }
      dispatch(setUser(user))
    }

    return navigate('/', { replace: true })
  }

  useEffect(() => {
    apiCall(() => handler())
  }, [])

  return <h2>Loading...</h2>
}
