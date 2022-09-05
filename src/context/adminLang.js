import React from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import { DEFAULT_LANGUAGE } from '../utils/const'

const context = React.createContext(null)

const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
]

const { user } = store.getState()

export function LangProvider({ children }) {
  return (
    <context.Provider
      value={React.useState(
        languages.find(
          (lang) => lang.value === (user?.lang || DEFAULT_LANGUAGE),
        ),
      )}
    >
      {children}
    </context.Provider>
  )
}

LangProvider.propTypes = {
  children: PropTypes.node,
}

export default function useLanguageContext() {
  return React.useContext(context)
}
