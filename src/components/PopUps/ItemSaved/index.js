import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import Text, { H2 } from '../../Text'
import Button from '../../Button'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import { ReactComponent as ItemSavedPic } from '../../../assets/icons/item-saved.svg'

export default function ItemSaved({ setShow }) {
  const navigate = useNavigate()

  function closePop() {
    navigate('/recycling-bin')
    setShow(false)
  }

  return (
    <PopWrapper>
      <ItemSavedContainer>
        <Xmark onClick={() => closePop()} className="close-btn" />
        <Title>
          <FormattedMessage
            id="itemSaved:Title"
            defaultMessage="The item was successfully registered !"
          />
        </Title>
        <ItemSavedPic className="icon" />
        <Text className="text">
          <FormattedMessage
            id="itemSaved:Description"
            defaultMessage="You can now drop the item off at your nearest Monoprix store."
          />
        </Text>
        <Link className="link-btn" to="../scan-item">
          <Button inverted>
            <FormattedMessage
              id="itemSaved:ScanAnother"
              defaultMessage="Scan another item"
            />
          </Button>
        </Link>
        <Link className="link-btn" to="/map">
          <Button>
            <FormattedMessage
              id="itemSaved:Drop"
              defaultMessage="Drop off now"
            />
          </Button>
        </Link>
      </ItemSavedContainer>
    </PopWrapper>
  )
}

ItemSaved.propTypes = {
  setShow: PropTypes.func,
}

export const Title = styled(H2)`
  margin-top: 50px;
  margin-bottom: -5px;
`
export const ItemSavedContainer = styled(PopContainer)`
  .text {
    text-align: center;
    margin-bottom: 10px;
  }

  .icon {
    margin-bottom: 10px;
  }

  .link-btn {
    width: 100%;
    margin-bottom: 20px;

    &.drop {
      margin-bottom: 32px;
    }
  }
`
