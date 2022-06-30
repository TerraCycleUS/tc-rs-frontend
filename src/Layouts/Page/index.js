import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
}) {
  return (
    <Wrapper className={`page ${backgroundGrey ? 'backgroundGrey' : ''}`}>
      <Header backButton={backButton} title={title} customTitle={customTitle} />
      <div className="divider" />
      <Container
        className={`page-content ${backgroundGrey ? 'backgroundGrey' : ''} ${
          pdTop25 ? 'pdTop25' : ''
        } px-3 w-md-50`}
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
  backButton: PropTypes.bool,
  customTitle: PropTypes.bool,
  footer: PropTypes.bool,
  backgroundGrey: PropTypes.bool,
  pdTop25: PropTypes.bool,
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  &.backgroundGrey {
    background-color: ${({ theme }) => theme.terraGrey};
  }

  .divider {
    background-color: ${({ theme }) => theme.main};
    height: 20px;
    flex-shrink: 0;
  }

  .page-content {
    border-radius: 20px 20px 0 0;
    margin-top: -19px;
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
`
