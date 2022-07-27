import React from 'react'
import Container from 'react-bootstrap/Container'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow.svg'
import classes from './Header.module.scss'

export default function Header({
  title,
  backButton,
  customTitle = false,
  steps,
}) {
  let titleContent = title

  if (!customTitle) {
    titleContent = <h4 className="header-title my-text-h4">{title}</h4>
  }

  const navigate = useNavigate()

  let onClick = null

  if (backButton) {
    if (typeof backButton === 'function') {
      onClick = backButton
    } else {
      onClick = () => navigate(-1)
    }
  }

  return (
    <div
      className={classNames(
        'header',
        classes.wrapper,
        'position-relative',
        'text-white',
        'my-bg-color-main',
        'bottom-curved',
      )}
    >
      <Container>
        <div className="position-relative">
          {backButton ? (
            <button
              type="button"
              className={classNames(
                'position-absolute',
                'start-0',
                'h-100',
                'top-50',
                classes.backBtn,
              )}
              onClick={onClick}
            >
              <ForwardArrow />
            </button>
          ) : null}
          <div className="header-title-wrapper">{titleContent}</div>
          {steps ? (
            <div
              className={classNames(
                classes.steps,
                'position-absolute',
                'end-0',
                'd-flex',
                ' my-text-description',
                'justify-content-end',
                'align-items-center',
                'h-100',
                'top-50',
                'my-color-terraWhite',
              )}
            >
              {steps}
              <FormattedMessage id="scanItem:Steps" defaultMessage="steps" />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  backButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  customTitle: PropTypes.bool,
  steps: PropTypes.string,
}
