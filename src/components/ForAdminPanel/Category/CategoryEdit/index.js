import React from 'react'
import { Edit, SimpleForm, TextInput, useNotify } from 'react-admin'
import { onError } from '../../adminUtils'

export default function CategoryEdit() {
  const notify = useNotify()
  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{ onError: (error) => onError(error, notify) }}
    >
      <SimpleForm>
        <TextInput name="title" source="title" fullWidth />
      </SimpleForm>
    </Edit>
  )
}
