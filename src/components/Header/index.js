import React from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow.svg'

export default function Header({
  title,
  backButton,
  customTitle = false,
  steps,
}) {
  let titleContent = title

  if (!customTitle) {
    titleContent = <Title>{title}</Title>
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
    <Wrapper className="header">
      <Container>
        <Row>
          <div>
            {backButton ? (
              <BackButton onClick={onClick}>
                <ForwardArrow />
              </BackButton>
            ) : null}
          </div>
          <div>{titleContent}</div>
          <div>
            {steps ? (
              <StepsContainer>
                {steps}
                <FormattedMessage id="scanItem:Steps" defaultMessage="steps" />
              </StepsContainer>
            ) : (
              ''
            )}
          </div>
        </Row>
      </Container>
    </Wrapper>
  )
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  backButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  customTitle: PropTypes.bool,
  steps: PropTypes.string,
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 1.5fr 0.75fr;
`

const Wrapper = styled.header`
  color: #fff;
  background-color: ${({ theme }) => theme.main};
  padding-top: 30px;
  padding-bottom: 24px;
  position: relative;
  z-index: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: transparent;
    bottom: -50px;
    height: 50px;
    width: 25px;
    border-top-left-radius: 20px;
    box-shadow: 0 -20px 0 0 ${({ theme }) => theme.main};
  }

  &::after {
    right: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 20px;
  }

  @media (min-width: 768px) {
    .container {
      max-width: 50%;
    }
  }
`

const StepsContainer = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  color: ${({ theme }) => theme.terraWhite};
  justify-content: flex-end;
  align-items: center;
  height: 100%;
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
