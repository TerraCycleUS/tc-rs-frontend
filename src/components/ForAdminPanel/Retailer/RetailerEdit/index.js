import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  useNotify,
  ImageInput,
  ImageField,
} from 'react-admin'
import RichTextEditor from '../../../RichTextEditor'

export default function RetailerEdit() {
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
        <ImageInput
          accept="image/*"
          name="logo"
          source="logo"
          fullWidth
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          accept="image/*"
          name="backgroundImage"
          source="backgroundImage"
          fullWidth
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          accept="image/*"
          name="smallLogo"
          source="smallLogo"
          fullWidth
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <RichTextEditor source="description" />
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
