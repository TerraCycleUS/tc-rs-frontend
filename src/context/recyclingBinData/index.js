import React from 'react'
import PropTypes from 'prop-types'

const context = React.createContext(null)

const defaultValues = {
  category: '',
  brand: '',
}

export function RecyclingBinDataProvider({ children }) {
  return (
    <context.Provider value={React.useState(defaultValues)}>
      {children}
    </context.Provider>
  )
}

RecyclingBinDataProvider.propTypes = {
  children: PropTypes.node,
}

export const useRecyclingBinData = () => React.useContext(context)
