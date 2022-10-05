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
  pdTop30,
  className,
  innerClassName,
  noSidePadding,
  width100,
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
        'hide-on-exit',
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
          innerClassName,
          {
            [classes.backgroundGrey]: backgroundGrey,
            [classes.pdTop25]: pdTop25,
            [classes.pdTop30]: pdTop30,
            [classes.footerPresent]: footer,
            [classes.noSidePadding]: noSidePadding,
            [classes.width100]: width100,
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
  innerClassName: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.bool,
  backgroundGrey: PropTypes.bool,
  pdTop25: PropTypes.bool,
  pdTop30: PropTypes.bool,
  noSidePadding: PropTypes.bool,
  width100: PropTypes.bool,
}
