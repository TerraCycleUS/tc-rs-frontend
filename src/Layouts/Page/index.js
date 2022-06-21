import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Header from '../../components/Header'

export default function Page({ children, backButton, title, customTitle }) {
  return (
    <Wrapper className="page">
      <Header backButton={backButton} title={title} customTitle={customTitle} />
      <div className="divider" />
      <Container className="page-content px-3 w-md-50">{children}</Container>
    </Wrapper>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
  backButton: PropTypes.bool,
  customTitle: PropTypes.bool,
}

const Wrapper = styled.div`
  .divider {
    background-color: ${({ theme }) => theme.main};
    height: 20px;
  }

  .page-content {
    border-radius: 20px 20px 0 0;
    margin-top: -19px;
    background-color: #fff;
    padding-top: 45px;
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
