import React from 'react'
import PropTypes from 'prop-types'

const context = React.createContext(null)

export function UserDataProvider({ children }) {
  return (
    <context.Provider value={React.useState(null)}>{children}</context.Provider>
  )
}

UserDataProvider.propTypes = {
  children: PropTypes.node,
}

export const useUserData = () => React.useContext(context)
