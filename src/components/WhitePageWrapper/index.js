import React from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactComponent as ForwardArrowGreen } from '../../assets/icons/forward-arrow-green.svg'
import classes from './WhitePageWrapper.module.scss'

export default function WhitePageWrapper({ children, noBackBtn }) {
  const navigate = useNavigate()

  return (
    <div className={classNames(classes.takePhotoWrapper, 'hide-on-exit')}>
      {!noBackBtn && (
        <nav className={classes.takePhotoNav}>
          <button type="button" onClick={() => navigate(-1)}>
            <ForwardArrowGreen />
          </button>
        </nav>
      )}
      {children}
    </div>
  )
}

WhitePageWrapper.propTypes = {
  children: PropTypes.node,
  noBackBtn: PropTypes.bool,
}
