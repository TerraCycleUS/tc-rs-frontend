import React from 'react'
import {
  Datagrid,
  DateField,
  List,
  TextField,
  ImageField,
  RichTextField,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

export default function RetailerList() {
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
        rowClick="edit"
      >
        <TextField source="id" />
        <TextField source="name" />
        <ImageField source="logo" />
        <ImageField source="backgroundImage" />
        <ImageField source="smallLogo" />
        <RichTextField source="description" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}
