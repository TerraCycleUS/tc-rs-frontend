import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Link } from 'react-router-dom'
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

export default function Home() {
  return (
    <>
      <HomeContainer className="for-home">
        <Wrapper>
          <StyledRecycleSave />
          <StyledHeading>
            <FormattedMessage
              id="home:Title"
              defaultMessage="Recycle with Monoprix"
            />
          </StyledHeading>
          <BubbleContainer>
            <Bubble>
              <Box className="bubble-icon" />
              <Text className="bubble-text">
                <FormattedMessage
                  id="home:Bubble1"
                  defaultMessage="Collect products for your virtual recycling bin"
                />
              </Text>
              <BubbleEnd />
              <Arrow className="arrow" />
            </Bubble>
            <Bubble>
              <Recycling className="bubble-icon" />
              <Text className="bubble-text">
                <FormattedMessage
                  id="home:Bubble2"
                  defaultMessage="Recycle at your local Monoprix"
                />
              </Text>
              <BubbleEnd />
              <Arrow className="arrow" />
            </Bubble>
            <Bubble>
              <Discount className="bubble-icon" />
              <Text className="bubble-text">
                <FormattedMessage
                  id="home:Bubble3"
                  defaultMessage="Redeem your recycling for discounts and coupons"
                />
              </Text>
            </Bubble>
          </BubbleContainer>
          <Link to="registration" className="link-register">
            <Button>
              <FormattedMessage
                id="home:Submit"
                defaultMessage="Start recycling"
              />
            </Button>
          </Link>
        </Wrapper>
      </HomeContainer>
      <FooterNav />
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
  min-height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.terraGrey};

  &.for-home {
    padding-bottom: 80px;
  }

  &.anim-exit,
  &.anim-exit + .footer-nav-wrapper {
    display: none;
  }

  .link-register {
    width: 100%;
  }
`
