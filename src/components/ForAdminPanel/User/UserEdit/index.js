import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

export default function UserEdit() {
  return (
    <Edit undoable={false} mutationMode="pessimistic">
      <SimpleForm>
        <TextInput source="name" name="name" fullWidth />
        <TextInput source="email" name="email" fullWidth />
        <TextInput source="zipcode" name="zipcode" fullWidth />
        <TextInput
          source="retailerId"
          name="retailerId"
          format={(value) => value || ''}
          parse={(input) => (input === '' ? null : input)}
          fullWidth
        />
        <TextInput source="lang" name="lang" fullWidth />
      </SimpleForm>
    </Edit>
  )
}
