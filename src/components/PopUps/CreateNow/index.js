import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Text from '../../Text'
import Button from '../../Button'
import StyledRecycleSave from '../../Icons/StyledRecycleSave'

import { Bubble, BubbleContainer, BubbleEnd } from '../../Bubble'
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import { ReactComponent as Download } from '../../../assets/icons/download.svg'
import { ReactComponent as CreateId } from '../../../assets/icons/create-id.svg'
import { ReactComponent as ComeBack } from '../../../assets/icons/come-back.svg'

export default function CreateNow({ setShow }) {
  return (
    <PopWrapper>
      <PopContainer>
        <StyledRecycleSave />
        <PopBubbleContainer>
          <Bubble>
            <Download className="bubble-icon" />
            <Text className="bubble-text">Download the Monoprix app</Text>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble>
            <CreateId className="bubble-icon" />
            <Text className="bubble-text">Create your ID</Text>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble>
            <ComeBack className="bubble-icon" />
            <Text className="bubble-text">Come back to Terracycle app</Text>
          </Bubble>
        </PopBubbleContainer>
        <Button>Let’s start</Button>
        <Button className="no-bg-btn" onClick={() => setShow(false)}>
          Don’t show again
        </Button>
      </PopContainer>
    </PopWrapper>
  )
}

CreateNow.propTypes = {
  setShow: PropTypes.func,
}

export const PopContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  z-index: 101;

  .no-bg-btn {
    margin-top: 27px;
    margin-bottom: 26px;
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

export const PopBubbleContainer = styled(BubbleContainer)`
  padding: 0 9px;

  .bubble-icon {
    margin-right: 20px;
  }
`
