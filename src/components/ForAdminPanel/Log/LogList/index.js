import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'
const logFilters = [
  <ReferenceInput source="userId" name="userId" reference="user" alwaysOn>
    <>
      <AutocompleteInput
        label="Name"
        optionText="name"
        sx={{ minWidth: '210px', marginRight: '20px' }}
      />
      <AutocompleteInput
        label="Email"
        optionText="email"
        sx={{ minWidth: '300px' }}
      />
    </>
  </ReferenceInput>,
]

export default function LogList() {
  return (
    <List filters={logFilters}>
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <TextField source="actionType" />
        <TextField source="entityName" />
        <TextField source="entityId" />
        <RichTextField source="description" />
        <ReferenceField
          source="userId"
          reference="user"
          link={false}
          emptyText="Unknown"
        >
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
        <DateField showTime source="createdAt" />
      </Datagrid>
    </List>
  )
}
