import React from 'react'
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  RichTextField,
  ImageField,
  FunctionField,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

export default function CouponList() {
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
        <RichTextField source="description" />
        <NumberField source="requiredAmount" />
        <FunctionField
          source="discount"
          render={(record) => `${record.discount}€`}
        />
        <ImageField source="brandLogo" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <ImageField source="backgroundImage" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <NumberField source="retailerId" />
      </Datagrid>
    </List>
  )
}
