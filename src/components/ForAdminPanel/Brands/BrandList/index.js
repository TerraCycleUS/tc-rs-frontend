import React from 'react'
import { Datagrid, List, TextField } from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

export default function BrandList() {
  return (
    <List>
      <Datagrid
        sx={{
          '& span': {
            overflow: 'hidden',
            maxHeight: '200px',
            display: 'inline-block',
          },
        }}
        bulkActionButtons={<BulkActionButtons />}
      >
        <TextField source="id" />
        <TextField source="name" />
      </Datagrid>
    </List>
  )
}
