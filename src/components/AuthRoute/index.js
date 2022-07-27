import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function AuthRoute({ children }) {
  const user = useSelector((state) => state.user)

  if (!user) return <Navigate to="/sign-in" replace />

  return children
}

AuthRoute.propTypes = {
  children: PropTypes.node,
}
