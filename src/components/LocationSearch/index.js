import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import { ReactComponent as GreenBack } from '../../assets/icons/green-back.svg'
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/magnifying-glass.svg'
import { ReactComponent as ResetSearch } from '../../assets/icons/reset-search.svg'
import classes from './LocationSearch.module.scss'

export default function LocationSearch({
  searchValue,
  setSearchValue,
  className,
  focused,
  setFocus,
}) {
  const { formatMessage } = useIntl()
  const placeholder = formatMessage({
    id: 'locationSearch:Search',
    defaultMessage: 'Search ...',
  })
  function getIcon() {
    if (!focused) return <MagnifyingGlass className={classes.leftIcon} />
    return (
      <button
        className={classes.iconBtn}
        type="button"
        onClick={() => {
          setFocus(false)
        }}
      >
        <GreenBack className={classes.leftIcon} />
      </button>
    )
  }

  function getClearBtn() {
    if (searchValue === '') return ''
    return (
      <button
        className={classes.iconBtn}
        type="button"
        onClick={() => {
          setSearchValue('')
        }}
      >
        <ResetSearch className={classes.rightIcon} />
      </button>
    )
  }

  return (
    <div className={classNames(classes.searchWrapper, className)}>
      {getIcon()}
      <input
        className={classes.searchInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setFocus(true)}
        placeholder={placeholder}
      />
      {getClearBtn()}
    </div>
  )
}

LocationSearch.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  className: PropTypes.string,
  focused: PropTypes.bool,
  setFocus: PropTypes.func,
}
