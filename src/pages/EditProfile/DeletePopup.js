import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { PopContainer, PopWrapper } from '../../components/PopUps/GenericPop'
import Button from '../../components/Button'
import Text, { H2 } from '../../components/Text'

export default function DeletePopup({ onContinue, onCancel }) {
  return (
    <PopWrapper>
      <PopupContainer className="popup-container">
        <H2 className="title">
          <FormattedMessage
            id="profileEdit:DeletePopupTitle"
            defaultMessage="Warning!"
          />
        </H2>
        <Text className="description my-color-textPrimary text-center">
          <FormattedMessage
            id="profileEdit:DeletePopupDescription1"
            defaultMessage="Are you sure you want to delete your account?"
          />
        </Text>
        <Text className="description my-color-textPrimary text-center">
          <strong>
            <FormattedMessage
              id="profileEdit:DeletePopupDescription2"
              defaultMessage="All your scanned items, unlocked coupons and profile information will be permanently deleted."
            />
          </strong>
        </Text>
        <Button onClick={onContinue}>
          <FormattedMessage
            id="profileEdit:DeletePopupSubmitButton"
            defaultMessage="Delete"
          />
        </Button>
        <Button inverted onClick={onCancel} className="cancel-btn">
          <FormattedMessage
            id="profileEdit:DeletePopupCancelButton"
            defaultMessage="Cancel"
          />
        </Button>
      </PopupContainer>
    </PopWrapper>
  )
}

DeletePopup.propTypes = {
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
}

const PopupContainer = styled(PopContainer)`
  padding-top: 40px;
  padding-bottom: 30px;

  .title {
    margin-bottom: 18px;
  }

  .description {
    margin-bottom: 40px;
  }

  .cancel-btn {
    margin-top: 20px;
  }
`
