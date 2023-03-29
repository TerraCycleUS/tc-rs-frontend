import React from 'react'
import { BulkDeleteButton } from 'react-admin'
import PropTypes from 'prop-types'

export default function BulkActionButtons({ resource }) {
  const forbiddenToDelete = ['brand', 'category', 'page', 'log']
  if (forbiddenToDelete.includes(resource)) return null
  return <BulkDeleteButton mutationMode="pessimistic" />
}
BulkActionButtons.propTypes = {
  resource: PropTypes.string,
}
