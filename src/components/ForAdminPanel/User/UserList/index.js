import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  EmailField,
  BulkDeleteButton,
} from 'react-admin'

export default function UserList() {
  return (
    <List>
      <Datagrid bulkActionButtons={<PostBulkActionButtons />} rowClick="edit">
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
function PostBulkActionButtons() {
  return <BulkDeleteButton mutationMode="pessimistic" />
}
