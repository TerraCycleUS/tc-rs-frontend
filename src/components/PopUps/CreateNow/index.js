import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Text from '../../Text'
import Button from '../../Button'
import StyledRecycleSave from '../../Icons/StyledRecycleSave'

import { Bubble, BubbleContainer, BubbleEnd } from '../../Bubble'
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

export const PopContainer = styled.div`
  position: relative;
  height: fit-content;
  max-height: 100vh;
  width: 100%;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  overflow-y: auto;
  z-index: 101;

  .no-bg-btn {
    margin-top: 12px;
    margin-bottom: 26px;
  }

  .close-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    max-width: 50%;
  }
`

export const PopWrapper = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  background: rgba(108, 108, 108, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
    z-index: -100;
  }
`
export const PopRecycleSave = styled(StyledRecycleSave)`
  margin-top: 50px;
  margin-bottom: 32px;
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
  color: white;
  text-align: center;

  &:hover {
    color: white;
  }
`
