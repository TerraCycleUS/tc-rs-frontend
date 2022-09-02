import React from 'react'
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  ImageField,
  FunctionField,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'

export default function CouponList() {
  return (
    <List>
      <Datagrid bulkActionButtons={<BulkActionButtons />} rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="requiredAmount" />
        <FunctionField
          source="discount"
          render={(record) => `${record.discount}%`}
        />
        <ImageField source="brandLogo" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <ImageField source="backgroundImage" />
        <TextField source="status" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}
