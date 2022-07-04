import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Text from '../../Text'

import Button from '../../Button'
import { PopContainer, PopWrapper } from '../GenericPop'

export default function DeleteProduct({
  setShow,
  items,
  setItems,
  productToDelete,
}) {
  function deleteProduct() {
    setItems(items.filter((item) => item.id !== productToDelete))
    setShow(false)
  }

  return (
    <PopWrapper>
      <DeletePopContainer>
        <DeleteTitle className="title">
          <FormattedMessage
            id="deleteProduct:DeleteProduct"
            defaultMessage="Delete Product"
          />
        </DeleteTitle>
        <Text className="text">
          <FormattedMessage
            id="deleteProduct:AreYouSure"
            defaultMessage="Are you sure you want to delete this Product?"
          />
        </Text>
        <Button className="delete-btn" onClick={() => deleteProduct()}>
          <FormattedMessage id="deleteProduct:Delete" defaultMessage="Delete" />
        </Button>
        <Button className="cancel-btn" inverted onClick={() => setShow(false)}>
          <FormattedMessage id="deleteProduct:Cancel" defaultMessage="Cancel" />
        </Button>
      </DeletePopContainer>
    </PopWrapper>
  )
}

DeleteProduct.propTypes = {
  setShow: PropTypes.func,
  items: PropTypes.array,
  setItems: PropTypes.func,
  productToDelete: PropTypes.string,
}

export const DeletePopContainer = styled(PopContainer)`
  padding-top: 85.5px;
  padding-bottom: 85.5px;

  .title {
    margin-bottom: 18px;
  }

  .text {
    margin-bottom: 30px;
    text-align: center;
  }
  .delete-btn {
    margin-bottom: 30px;
  }
  .title {
    margin-bottom: 18px;
  }
`

export const DeleteTitle = styled.h2`
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: ${({ theme }) => theme.textBlack};
`
