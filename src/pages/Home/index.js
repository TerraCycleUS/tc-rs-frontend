import React from 'react'
import styled from 'styled-components'

import Text from '../../components/Text'
import Heading from '../../components/Heading'
import Button from '../../components/Button'

import { ReactComponent as Box } from '../../assets/icons/box.svg'
import { ReactComponent as Recycling } from '../../assets/icons/recycling-symbol.svg'
import { ReactComponent as Discount } from '../../assets/icons/discount.svg'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg'
import FooterNav from '../../components/FooterNav'

export default function Home() {
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
          <Button>Start recycling</Button>
        </Wrapper>
      </HomeContainer>
      <FooterNav />
    </>
  )
}

export const Bubble = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 19px;
  margin-bottom: 30px;
  position: relative;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background: white;
  z-index: 5;

  .bubble-icon {
    margin-right: 34px;
    flex-shrink: 0;
  }

  .arrow {
    position: absolute;
    transform-origin: center;
    transform: translateX(-50%);
    left: 50%;
    bottom: -10px;
  }

  * {
    z-index: 5;
  }
`

export const BubbleEnd = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: -3;
  bottom: -12px;
  left: 50%;
  transform-origin: center;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 7px;
`

export const BubbleContainer = styled.div`
  padding: 0 8px;
  margin-bottom: 2px;
  width: 100%;
`

export const StyledRecycleSave = styled(RecycleSave)`
  margin-top: 50px;
  margin-bottom: 23px;
  flex-shrink: 0;
`

export const Icon = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: green;
`
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
