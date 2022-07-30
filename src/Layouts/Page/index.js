import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Container from 'react-bootstrap/Container'

import classes from './Page.module.scss'
import FooterNav from '../../components/FooterNav'

export default function Page({
  children,
  footer,
  backgroundGrey,
  pdTop25,
  className,
}) {
  return (
    <div
      className={classNames(
        'page',
        'h-100',
        'd-flex',
        'flex-column',
        'w-100',
        'start-0',
        classes.wrapper,
        className,
        {
          [classes.backgroundGrey]: backgroundGrey,
        },
      )}
    >
      <Container
        className={classNames(
          'bg-white',
          'flex-column',
          'flex-grow-1',
          'd-flex',
          'px-3',
          'mt-md-0',
          classes.pageContent,
          {
            [classes.backgroundGrey]: backgroundGrey,
            [classes.pdTop25]: pdTop25,
            [classes.footerPresent]: footer,
          },
        )}
      >
        {children}
      </Container>
      {footer ? <FooterNav /> : ''}
    </div>
  )
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.bool,
  backgroundGrey: PropTypes.bool,
  pdTop25: PropTypes.bool,
}
