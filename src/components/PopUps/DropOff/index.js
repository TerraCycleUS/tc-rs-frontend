import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import Button from '../../Button'
import StyledRecycleSave from '../../Icons/StyledRecycleSave'
import classes from './DropOff.module.scss'
import homeClasses from '../../../pages/Home/Home.module.scss'

import { Bubble, BubbleContainer, BubbleEnd } from '../../Bubble'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import { ReactComponent as Scan } from '../../../assets/icons/scan-qr-code.svg'
import { ReactComponent as ItemsList } from '../../../assets/icons/items-list.svg'
import { ReactComponent as Discount } from '../../../assets/icons/drop-discount.svg'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'

export default function DropOffPopup({ setShow, onStart }) {
  return (
    <PopWrapper className="with-steps">
      <PopContainer className="with-steps">
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
            <div className={classes.stepTextWrapper}>
              <div className={homeClasses.step}>1</div>
              <p className="bubble-text my-text-description my-color-textPrimary">
                <FormattedMessage
                  id="dropOffPopup:Bubble1"
                  defaultMessage="Scan the second QR code on the in-store kiosk"
                />
              </p>
            </div>
            <Scan className={classes.bubbleIcon} />
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className={classes.popBubble}>
            <div className={classes.stepTextWrapper}>
              <div className={homeClasses.step}>2</div>
              <p className="bubble-text my-text-description my-color-textPrimary">
                <FormattedMessage
                  id="dropOffPopup:Bubble2"
                  defaultMessage="Move items from your virtual recycling bin to the dedicated in-store kiosk"
                />
              </p>
            </div>
            <ItemsList className={classes.bubbleIcon} />
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className={classes.popBubble}>
            <div className={classes.stepTextWrapper}>
              <div className={homeClasses.step}>3</div>
              <p className="bubble-text my-text-description my-color-textPrimary">
                <FormattedMessage
                  id="dropOffPopup:Bubble3"
                  defaultMessage="Redeem your recycled items for coupons"
                  values={{ br: <br /> }}
                />
              </p>
            </div>
            <Discount className={classes.bubbleIcon} />
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
