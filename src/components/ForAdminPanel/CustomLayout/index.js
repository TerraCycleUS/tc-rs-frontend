import { AppBar, Layout } from 'react-admin'
import PropTypes from 'prop-types'
import React from 'react'
import StyledSelect from '../../StyledSelect'
import classes from './CustomLayout.module.scss'

export default function CustomLayout({ other, setLanguage, language }) {
  return (
    <Layout
      {...other}
      appBar={() => (
        <CustomAppBar
          other={other}
          setLanguage={setLanguage}
          language={language}
        />
      )}
    />
  )
}
CustomLayout.propTypes = {
  other: PropTypes.object,
  language: PropTypes.object,
  setLanguage: PropTypes.func,
}

export function CustomAppBar({ setLanguage, language }) {
  return (
    <AppBar>
      <StyledSelect
        className={classes.select}
        options={[
          { value: 'en', label: 'English' },
          { value: 'fr', label: 'French' },
        ]}
        placeholder="Suggestion"
        id="topic"
        value={language}
        onChange={(languageObject) => setLanguage(languageObject)}
      />
    </AppBar>
  )
}
CustomAppBar.propTypes = {
  language: PropTypes.object,
  setLanguage: PropTypes.func,
}
