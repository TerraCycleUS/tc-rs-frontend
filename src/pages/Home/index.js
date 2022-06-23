import React, { useState } from 'react'
import styled from 'styled-components'

import Text from '../../components/Text'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import FooterNav from '../../components/FooterNav'
import { Bubble, BubbleContainer, BubbleEnd } from '../../components/Bubble'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'

import { ReactComponent as Box } from '../../assets/icons/box.svg'
import { ReactComponent as Recycling } from '../../assets/icons/recycling-symbol.svg'
import { ReactComponent as Discount } from '../../assets/icons/discount.svg'
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg'
import CreateNow from '../../components/PopUps/CreateNow'

export default function Home() {
  const [show, setShow] = useState(false)

  function openPop() {
    setShow(true)
  }

  return (
    <>
      <HomeContainer className="for-home">
        <Wrapper>
          <StyledRecycleSave />
          <StyledHeading>Recycle with Monoprix</StyledHeading>
          <BubbleContainer>
            <Bubble>
              <Box className="bubble-icon" />
              <Text className="bubble-text">
                Collect products for your virtual recycling bin
              </Text>
              <BubbleEnd />
              <Arrow className="arrow" />
            </Bubble>
            <Bubble>
              <Recycling className="bubble-icon" />
              <Text className="bubble-text">
                Recycle at your local Monoprix
              </Text>
              <BubbleEnd />
              <Arrow className="arrow" />
            </Bubble>
            <Bubble>
              <Discount className="bubble-icon" />
              <Text className="bubble-text">
                Redeem your recycling for discounts and coupons
              </Text>
            </Bubble>
          </BubbleContainer>
          <Button onClick={openPop}>Start recycling</Button>
        </Wrapper>
      </HomeContainer>
      <FooterNav />
      {show ? <CreateNow setShow={setShow} /> : ''}
    </>
  )
}

export const StyledHeading = styled(Heading)`
  margin-bottom: 19px;
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    max-width: 50%;
  }
`

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.terraGrey};

  &.for-home {
    padding-bottom: 20px;
  }
`
