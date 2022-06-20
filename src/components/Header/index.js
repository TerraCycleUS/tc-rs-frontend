import React from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow.svg'

export default function Header({ title, backButton, customTitle = false }) {
  let titleContent = title

  if (!customTitle) {
    titleContent = <Title>{title}</Title>
  }

  const navigate = useNavigate()

  return (
    <Wrapper className="header">
      <Container className="px-3">
        <Row>
          <Col xs={2}>
            {backButton ? (
              <BackButton onClick={() => navigate(-1)}>
                <ForwardArrow />
              </BackButton>
            ) : null}
          </Col>
          <Col xs={8}>{titleContent}</Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  backButton: PropTypes.bool,
  customTitle: PropTypes.bool,
}

const Wrapper = styled.header`
  color: #fff;
  background-color: ${({ theme }) => theme.main};
  padding: 30px 0;

  @media (min-width: 768px) {
    .container {
      max-width: 50%;
    }
  }
`
const Title = styled.h4`
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
`
const BackButton = styled.button`
  height: 100%;
`
