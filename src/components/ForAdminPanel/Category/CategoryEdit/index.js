import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

export default function CategoryEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput name="title" source="title" fullWidth />
      </SimpleForm>
    </Edit>
  )
}
