import React from 'react'
import { Datagrid, List, TextField, EmailField } from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

export default function UserList() {
  return (
    <List>
      <Datagrid bulkActionButtons={<BulkActionButtons />} rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="zipcode" />
        <TextField source="status" />
        <TextField source="retailerId" />
        <TextField source="lang" />
        <TextField source="role" />
      </Datagrid>
    </List>
  )
}
