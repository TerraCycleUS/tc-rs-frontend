import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
// import { useSelector } from 'react-redux'
import Text, { H2 } from '../../Text'

import Button from '../../Button'
import { PopContainer, PopWrapper } from '../GenericPop'
// import http from '../../../utils/http'

export default function DeleteProduct({
  setShow,
  items,
  setItems,
  productToDelete,
}) {
  // const user = useSelector((state) => state.user)
  //
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${user.authorization}`,
  //   },
  // }

  function deleteProduct() {
    setItems(items.filter((item) => item.id !== productToDelete))
    setShow(false)
    // const idToDelete = { id: productToDelete }
    //   // .delete('/api/waste', idToDelete)
    // http
    //   .delete(`/api/waste/${productToDelete}`, config)
    //   .then(() => {
    //     setShow(false)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
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
