import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import Container from 'react-bootstrap/Container'

import Header from '../../components/Header'
import FooterNav from '../../components/FooterNav'

export default function Page({
  children,
  backButton,
  title,
  customTitle,
  footer,
  backgroundGrey,
  pdTop25,
  css = '',
}) {
  return (
    <Wrapper className={classNames('page', { backgroundGrey })} css={css}>
      <Header backButton={backButton} title={title} customTitle={customTitle} />
      <Container
        className={classNames('page-content', 'px-3', {
          backgroundGrey,
          pdTop25,
        })}
      >
        {children}
      </Container>
      {footer ? <FooterNav /> : ''}
    </Wrapper>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
  backButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  customTitle: PropTypes.bool,
  footer: PropTypes.bool,
  backgroundGrey: PropTypes.bool,
  pdTop25: PropTypes.bool,
  css: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  &.backgroundGrey {
    background-color: ${({ theme }) => theme.terraGrey};
  }

  .page-content {
    background-color: #fff;
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &.backgroundGrey {
      background-color: ${({ theme }) => theme.terraGrey};
    }
    &.pdTop25 {
      padding-top: 25px;
    }
  }

  @media (min-width: 768px) {
    .divider {
      display: none;
    }

    .page-content {
      margin-top: 0;
      border-radius: 0;
      max-width: 50%;
    }
  }

  ${({ css }) => css}
`
