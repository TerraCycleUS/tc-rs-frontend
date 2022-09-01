import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from 'react-admin'

export default function CouponEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput name="name" source="name" fullWidth />
        <TextInput name="description" source="description" fullWidth />
        <NumberInput name="requiredAmount" source="requiredAmount" fullWidth />
        <NumberInput name="discount" source="discount" fullWidth />
        <TextInput name="brandLogo" source="brandLogo" fullWidth />
        <DateInput name="startDate" source="startDate" fullWidth />
        <DateInput name="endDate" source="endDate" fullWidth />
        <TextInput name="backgroundImage" source="backgroundImage" fullWidth />
        <NumberInput
          name="availableAmount"
          source="availableAmount"
          fullWidth
        />
      </SimpleForm>
    </Edit>
  )
}
