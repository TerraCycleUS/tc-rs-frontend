import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Text from '../../Text'
import Button from '../../Button'
import StyledRecycleSave from '../../Icons/StyledRecycleSave'

import { Bubble, BubbleContainer, BubbleEnd } from '../../Bubble'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import { ReactComponent as Download } from '../../../assets/icons/download.svg'
import { ReactComponent as CreateId } from '../../../assets/icons/create-id.svg'
import { ReactComponent as ComeBack } from '../../../assets/icons/come-back.svg'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'

export default function CreateNow({ setShow }) {
  const [downloadLink] = useState(getMobileOperatingSystem())
  function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/android/i.test(userAgent)) {
      return process.env.REACT_APP_LINK_TO_GOOGLEPLAY
    }

    if (/iPad|iPhone|iPod|Mac/.test(userAgent) && !window.MSStream) {
      return process.env.REACT_APP_LINK_TO_APPSTORE
    }
    return process.env.REACT_APP_LINK_TO_GOOGLEPLAY
  }

  return (
    <PopWrapper>
      <PopContainer>
        <Xmark onClick={() => setShow(false)} className="close-btn" />
        <PopRecycleSave />
        <PopBubbleContainer>
          <Bubble className="pop-bubble">
            <Download className="bubble-icon" />
            <Text className="bubble-text">
              <FormattedMessage
                id="createNow:Bubble1"
                defaultMessage="Download the Monoprix app"
              />
            </Text>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className="pop-bubble">
            <CreateId className="bubble-icon" />
            <Text className="bubble-text">
              <FormattedMessage
                id="createNow:Bubble2"
                defaultMessage="Create your ID"
              />
            </Text>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className="pop-bubble">
            <ComeBack className="bubble-icon" />
            <Text className="bubble-text">
              <FormattedMessage
                id="createNow:Bubble3"
                defaultMessage="Come back to Terracycle app"
              />
            </Text>
          </Bubble>
        </PopBubbleContainer>
        <ButtonLink href={downloadLink} target="_blank">
          <FormattedMessage
            id="createNow:ButtonStart"
            defaultMessage="Let’s start"
          />
        </ButtonLink>
        <Button className="no-bg-btn" onClick={() => setShow(false)}>
          <FormattedMessage
            id="createNow:ButtonClose"
            defaultMessage="Don’t show again"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  )
}

CreateNow.propTypes = {
  setShow: PropTypes.func,
}

export const PopRecycleSave = styled(StyledRecycleSave)`
  margin-top: 48px;
  margin-bottom: 55px;
`
export const PopBubbleContainer = styled(BubbleContainer)`
  padding: 0 9px;

  .pop-bubble {
    min-height: 80px;
  }
  .bubble-icon {
    margin-right: 20px;
  }
`
export const ButtonLink = styled.a`
  display: block;
  background-color: ${({ theme }) => theme.main};
  border-radius: 60px;
  padding: 10px 1px;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 21px;
  font-weight: bold;
  color: ${({ theme }) => theme.terraWhite};
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.terraWhite};
  }
`
