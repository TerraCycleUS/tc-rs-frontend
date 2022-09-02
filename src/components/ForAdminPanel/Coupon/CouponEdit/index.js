import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  SelectInput,
  ImageInput,
  ImageField,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'

export default function CouponEdit() {
  const notify = useNotify()

  const onError = (error) => {
    notify(`${error.body.errors}`)
  }

  return (
    <Edit mutationMode="pessimistic" mutationOptions={{ onError }}>
      <SimpleForm>
        <TextInput name="name" source="name" fullWidth />
        <RichTextInput name="description" source="description" fullWidth />
        <NumberInput name="requiredAmount" source="requiredAmount" fullWidth />
        <NumberInput name="discount" source="discount" fullWidth />
        <ImageInput
          accept="image/*"
          name="brandLogo"
          source="brandLogo"
          fullWidth
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <DateInput name="startDate" source="startDate" fullWidth />
        <DateInput name="endDate" source="endDate" fullWidth />
        <ImageInput
          accept="image/*"
          name="backgroundImage"
          source="backgroundImage"
          fullWidth
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <SelectInput
          required
          source="langId"
          name="langId"
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
