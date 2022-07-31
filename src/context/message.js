import React from 'react'
import PropTypes from 'prop-types'
import useMessage from '../utils/useMessage'

const context = React.createContext(null)

export function MessageProvider({ children }) {
  return <context.Provider value={useMessage()}>{children}</context.Provider>
}

export function useMessageContext() {
  return React.useContext(context)
}

MessageProvider.propTypes = {
  children: PropTypes.node,
}
