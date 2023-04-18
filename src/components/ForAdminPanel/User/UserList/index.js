import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  EmailField,
  DateField,
  SelectInput,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

const userFilters = [
  <SelectInput
    label="Role"
    name="role"
    choices={[
      { id: 'USER', name: 'USER' },
      { id: 'ADMIN', name: 'ADMIN' },
    ]}
    source="role"
    emptyValue="USER"
    defaultValue="USER"
  />,
]

export default function UserList() {
  return (
    <List filters={userFilters} filterDefaultValues={{ role: 'USER' }}>
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
