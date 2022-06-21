import React from 'react'
import PropTypes from 'prop-types'
import { detectLanguage } from '../../utils/intl'

const context = React.createContext(null)
const lang = detectLanguage()

export function LocaleProvider({ children }) {
  return (
    <context.Provider value={React.useState(lang)}>{children}</context.Provider>
  )
}

LocaleProvider.propTypes = {
  children: PropTypes.node,
}

export const useLocale = () => React.useContext(context)
