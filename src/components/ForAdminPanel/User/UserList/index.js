import React from 'react'
import { Datagrid, List, TextField, EmailField, DateField } from 'react-admin'
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
        <TextField source="lang" />
        <TextField source="role" />
        <DateField showTime source="lastLogin" />
        <DateField showTime source="lastLogout" />
        <TextField source="isTwoFaEnabled" />
      </Datagrid>
    </List>
  )
}
