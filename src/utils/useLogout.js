import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../actions/user'

export default function useLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const exitRef = React.useRef(false)

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
    navigate('/sign-in', { replace: true })
  }
}
