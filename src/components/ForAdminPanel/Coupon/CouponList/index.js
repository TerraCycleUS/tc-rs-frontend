import React from 'react'
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  ImageField,
} from 'react-admin'

export default function CouponList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="requiredAmount" />
        <NumberField source="discount" />
        <ImageField source="brandLogo" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <ImageField source="backgroundImage" />
        <TextField source="status" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <NumberField source="availableAmount" />
      </Datagrid>
    </List>
  )
}
