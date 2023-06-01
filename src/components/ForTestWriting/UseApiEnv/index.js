import React from 'react'
import PropTypes from 'prop-types'
import TestEnvironment from '../TestEnvironment'
import { ApiErrorProvider } from '../../../context/apiError'
import { MessageProvider } from '../../../context/message'
import ApiError from '../../PopUps/ApiError'

export default function UseApiEnv({ children }) {
  return (
    <TestEnvironment>
      <ApiErrorProvider>
        <MessageProvider>
          {children}
          <ApiError />
        </MessageProvider>
      </ApiErrorProvider>
    </TestEnvironment>
  )
}

UseApiEnv.propTypes = {
  children: PropTypes.node,
}
