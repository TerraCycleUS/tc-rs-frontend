import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import Text, { H2 } from '../../Text'

import Button from '../../Button'
import { PopContainer, PopWrapper } from '../GenericPop'
import http from '../../../utils/http'

export default function DeleteProduct({
  setShow,
  setProducts,
  productToDelete,
}) {
  const user = useSelector((state) => state.user)
  const [wasClicked, setWasClicked] = useState(false)

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  function filterProducts(actualProducts) {
    return actualProducts.filter((item) => item.id !== productToDelete)
  }

  function deleteProduct() {
    setWasClicked(true)
    http
      .delete(`/api/waste/${productToDelete}`, config)
      .then(() => {
        setProducts(filterProducts)
        setShow(false)
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
      })
  }

  return (
    <PopWrapper>
      <DeletePopContainer>
        <H2 className="title">
          <FormattedMessage
            id="deleteProduct:DeleteProduct"
            defaultMessage="Delete Product"
          />
        </H2>
        <Text className="text">
          <FormattedMessage
            id="deleteProduct:AreYouSure"
            defaultMessage="Are you sure you want to delete this Product?"
          />
        </Text>
        <Button
          className="delete-btn"
          disabled={wasClicked}
          onClick={() => deleteProduct()}
        >
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
  setProducts: PropTypes.func,
  productToDelete: PropTypes.number,
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
