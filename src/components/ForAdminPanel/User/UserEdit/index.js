import React from 'react'
import {
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
} from 'react-admin'

export default function UserEdit() {
  const notify = useNotify()

  const onError = (error) => {
    notify(`${error.body.errors}`)
  }

  return (
    <Edit mutationMode="pessimistic" mutationOptions={{ onError }}>
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
        <SelectInput
          source="lang"
          name="lang"
          fullWidth
          choices={[
            { id: 'en', name: 'en' },
            { id: 'fr', name: 'fr' },
          ]}
        />
      </SimpleForm>
    </Edit>
  )
}
