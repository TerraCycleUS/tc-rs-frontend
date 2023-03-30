import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../actions/user'
import http from './http'
import useApiCall from './useApiCall'

export default function useLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const exitRef = React.useRef(false)
  const logoutApiCall = useApiCall()

  React.useEffect(
    () => () => {
      if (exitRef.current) {
        dispatch(setUser(null))
      }
    },
    [],
  )

  return function logout() {
    exitRef.current = true
    logoutApiCall(() => http.post('/api/auth/logout'), null, null, null, {
      message: false,
      retry: false,
    })
    navigate('/sign-in', { replace: true })
  }
}
