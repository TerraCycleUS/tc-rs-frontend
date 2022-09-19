import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function TutorialRoute({ children }) {
  const seenTutorial = useSelector((state) => state.seenTutorial)

  if (!seenTutorial) return <Navigate to="/profile/tutorial" replace />

  return children
}

TutorialRoute.propTypes = {
  children: PropTypes.node,
}
