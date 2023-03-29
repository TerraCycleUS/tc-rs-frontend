import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
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
        <ReferenceField source="userId" reference="user" emptyText="Unknown">
          <ul>
            <li>
              id: <TextField source="id" />
            </li>
            <li>
              name: <TextField source="name" />
            </li>
            <li>
              email: <TextField source="email" />
            </li>
          </ul>
        </ReferenceField>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}
