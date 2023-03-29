import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  RichTextField,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

export default function LogList() {
  return (
    <List>
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <TextField source="actionType" />
        <TextField source="entityName" />
        <TextField source="entityId" />
        <RichTextField source="description" />
        <TextField source="userId" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}
