import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, mixed } from 'yup'
import { useIntl } from 'react-intl'
import {
  Create,
  SimpleForm,
  TextInput,
  useNotify,
  ImageInput,
  ImageField,
} from 'react-admin'
import RichTextEditor from '../../../RichTextEditor'
import { onError } from '../../adminUtils'

export default function RetailerCreate() {
  const notify = useNotify()

  const { formatMessage } = useIntl()
  const scheme = object({
    name: string().required(
      formatMessage({
        id: 'adminRetailerCreate:NameError',
        defaultMessage: 'Name is required field',
      }),
    ),
    logo: mixed().required(
      formatMessage({
        id: 'adminRetailerCreate:LogoError',
        defaultMessage: 'Logo is required field',
      }),
    ),
    backgroundImage: mixed().required(
      formatMessage({
        id: 'adminRetailerCreate:BGImageError',
        defaultMessage: 'Background image is required field',
      }),
    ),
    smallLogo: mixed().required(
      formatMessage({
        id: 'adminRetailerCreate:SnallLogoError',
        defaultMessage: 'Small logo is required field',
      }),
    ),
    description: string().required(
      formatMessage({
        id: 'adminRetailerCreate:DescError',
        defaultMessage: 'Description is required field',
      }),
    ),
  })

  return (
    <Create
      sx={{
        '& .MuiPaper-root, MuiPaper-elevation, RaEdit-card': {
          overflow: 'visible',
        },
      }}
      mutationMode="pessimistic"
      mutationOptions={{ onError: (error) => onError(error, notify) }}
    >
      <SimpleForm resolver={yupResolver(scheme)}>
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
    </Create>
  )
}

function formatLogo(value) {
  if (!value || typeof value === 'string') {
    return { url: value }
  }
  return value
}
