import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Scanner from '../../components/Scanner'
import Text, { Description } from '../../components/Text'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow.svg'

export default function Scan() {
  const [result, setResult] = React.useState([])
  const width =
    window.innerWidth >= 768 ? window.innerWidth / 2 : window.innerWidth
  const navigate = useNavigate()
  return (
    <Wrapper className="scan-page-wrapper">
      <BackButton onClick={() => navigate('/')}>
        <ForwardArrow />
      </BackButton>
      <Scanner
        successHandler={(item) =>
          setResult((prev) => (prev.includes(item) ? prev : [...prev, item]))
        }
        width={width}
      />
      <Container className="text-center">
        <Text>Results:</Text>
        {result.map((item) => (
          <Description key={item}>{item}</Description>
        ))}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const BackButton = styled.button`
  height: 50px;
  width: 50px;
  margin: 20px;

  svg {
    height: 100%;
    width: 100%;

    background-color: ${({ theme }) => theme.main};
  }
`
