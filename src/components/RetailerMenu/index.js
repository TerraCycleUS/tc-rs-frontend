import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './RetailerMenu.module.scss'

export default function RetailerMenu({
  retailers,
  setActiveRetailer,
  activeRetailer,
  className,
}) {
  return (
    <div className={classNames(classes.menuWrapper, className)}>
      {retailers?.map(({ id, name }) => (
        <button
          type="button"
          key={id}
          id={id}
          onClick={() => setActiveRetailer(id)}
          disabled={activeRetailer === id}
          className={classes.menuItem}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

RetailerMenu.propTypes = {
  retailers: PropTypes.array,
  setActiveRetailer: PropTypes.func,
  activeRetailer: PropTypes.number,
  className: PropTypes.string,
}
