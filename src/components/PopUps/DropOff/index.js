import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import Button from '../../Button'
import StyledRecycleSave from '../../Icons/StyledRecycleSave'
import classes from './DropOff.module.scss'

import { Bubble, BubbleContainer, BubbleEnd } from '../../Bubble'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import { ReactComponent as Scan } from '../../../assets/icons/scan-qr-code.svg'
import { ReactComponent as ItemsList } from '../../../assets/icons/items-list.svg'
import { ReactComponent as Discount } from '../../../assets/icons/discount.svg'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'

export default function DropOffPopup({ setShow, onStart }) {
  return (
    <PopWrapper>
      <PopContainer>
        <Xmark onClick={() => setShow(false)} className="close-btn" />
        <StyledRecycleSave className={classes.recycleLogo} />
        <p
          className={classNames(
            'my-text my-color-textPrimary text-center top-description',
            classes.topDescription,
          )}
        >
          <FormattedMessage
            id="dropOffPopup:TopDescription"
            defaultMessage="After signing up and confirming the store location:"
          />
        </p>
        <BubbleContainer className={classes.container}>
          <Bubble className={classes.popBubble}>
            <Scan className={classes.bubbleIcon} />
            <p className="bubble-text my-text-description my-color-textPrimary">
              <FormattedMessage
                id="dropOffPopup:Bubble1"
                defaultMessage="Scan the second QR code on the in-store kiosk"
              />
            </p>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className={classes.popBubble}>
            <ItemsList className={classes.bubbleIcon} />
            <p className="bubble-text my-text-description my-color-textPrimary">
              <FormattedMessage
                id="dropOffPopup:Bubble2"
                defaultMessage="Move items from your virtual recycling bin to the dedicated in-store kiosk"
              />
            </p>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className={classes.popBubble}>
            <Discount className={classes.bubbleIcon} />
            <p className="bubble-text my-text-description my-color-textPrimary">
              <FormattedMessage
                id="dropOffPopup:Bubble3"
                defaultMessage="Redeem your recycled items for coupons"
                values={{ br: <br /> }}
              />
            </p>
          </Bubble>
        </BubbleContainer>
        <Button onClick={onStart}>
          <FormattedMessage
            id="dropOffPopup:ButtonStart"
            defaultMessage="Start"
          />
        </Button>
        <Button className="no-bg-btn" onClick={() => setShow(false)}>
          <FormattedMessage
            id="dropOffPopup:ButtonClose"
            defaultMessage="Continue later"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  )
}

DropOffPopup.propTypes = {
  setShow: PropTypes.func,
  onStart: PropTypes.func,
}
