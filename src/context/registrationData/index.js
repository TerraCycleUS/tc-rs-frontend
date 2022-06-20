import React from 'react'
import PropTypes from 'prop-types'

const context = React.createContext(null)

const defaultValues = {
  name: '',
  email: '',
  zip: '',
  terms: false,
  privacy: false,
  messages: false,
}

export function RegistrationDataProvider({ children }) {
  return (
    <context.Provider value={React.useState(defaultValues)}>
      {children}
    </context.Provider>
  )
}

RegistrationDataProvider.propTypes = {
  children: PropTypes.node,
}

export const useRegistrationData = () => React.useContext(context)
