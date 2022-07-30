import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { Link } from 'react-router-dom'
import Text from '../../components/Text'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import FooterNav from '../../components/FooterNav'
import { Bubble, BubbleContainer, BubbleEnd } from '../../components/Bubble'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'
import classes from './Home.module.scss'

import { ReactComponent as Box } from '../../assets/icons/box.svg'
import { ReactComponent as Recycling } from '../../assets/icons/recycling-symbol.svg'
import { ReactComponent as Discount } from '../../assets/icons/discount.svg'
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg'

export default function Home() {
  return (
    <div
      className={classNames(
        'w-100',
        'd-flex',
        'align-items-center',
        'flex-column',
        'my-bg-color-terraGrey',
        classes.forHome,
        classes.homeContainer,
      )}
    >
      <div
        className={classNames(
          'w-100',
          'd-flex',
          'flex-column',
          'align-items-center',
          classes.wrapper,
        )}
      >
        <StyledRecycleSave />
        <Heading className={classes.styleHeading}>
          <FormattedMessage
            id="home:Title"
            defaultMessage="Recycle with Monoprix"
          />
        </Heading>
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
        <Link to="registration" className="w-100 link-register">
          <Button>
            <FormattedMessage
              id="home:Submit"
              defaultMessage="Start recycling"
            />
          </Button>
        </Link>
      </div>
      <FooterNav />
    </div>
  )
}
