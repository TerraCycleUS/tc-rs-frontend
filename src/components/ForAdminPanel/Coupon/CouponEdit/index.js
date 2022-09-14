import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  ImageInput,
  ImageField,
} from 'react-admin'
import RichTextEditor from '../../../RichTextEditor'

export default function CouponEdit() {
  const notify = useNotify()

  const onError = (error) => {
    notify(`${error.body.errors}`)
  }

  return (
    <Edit
      sx={{
        '& .MuiPaper-root, MuiPaper-elevation, RaEdit-card': {
          overflow: 'visible',
        },
      }}
      mutationMode="pessimistic"
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput name="name" source="name" fullWidth />
        <RichTextEditor source="description" />
        <NumberInput name="requiredAmount" source="requiredAmount" fullWidth />
        <NumberInput name="discount" source="discount" fullWidth />
        <ImageInput
          accept="image/*"
          name="brandLogo"
          source="brandLogo"
          fullWidth
          format={formatLogo}
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
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  )
}

function formatLogo(value) {
  if (!value || typeof value === 'string') {
    return { url: value }
  }
  return value
}
