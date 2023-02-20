import React from 'react'
import { Edit, SimpleForm, TextInput, useNotify } from 'react-admin'
import { onError } from '../../adminUtils'

export default function BrandEdit() {
  const notify = useNotify()

  return (
    <Edit
      sx={{
        '& .MuiPaper-root, MuiPaper-elevation, RaEdit-card': {
          overflow: 'visible',
        },
      }}
      mutationMode="pessimistic"
      mutationOptions={{ onError: (error) => onError(error, notify) }}
    >
      <SimpleForm>
        <TextInput name="name" source="name" fullWidth />
      </SimpleForm>
    </Edit>
  )
}
