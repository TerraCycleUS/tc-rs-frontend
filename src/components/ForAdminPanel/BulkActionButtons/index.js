import React from 'react'
import { BulkDeleteButton } from 'react-admin'

export default function BulkActionButtons() {
  return <BulkDeleteButton mutationMode="pessimistic" />
}
