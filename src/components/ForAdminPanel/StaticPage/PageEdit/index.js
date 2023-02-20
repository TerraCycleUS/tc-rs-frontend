import React from 'react'
import { Edit, SimpleForm, TextInput, useNotify } from 'react-admin'
import useLanguageContext from '../../../../context/adminLang'
import RichTextEditor from '../../../RichTextEditor'
import { onError } from '../../adminUtils'

export default function PageEdit() {
  const notify = useNotify()
  const [lang] = useLanguageContext()

  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{ onError: (error) => onError(error, notify) }}
      transform={(data) => ({
        title: data.title,
        body: data.body,
        langId: lang.value,
      })}
      sx={{
        '& .MuiPaper-root, MuiPaper-elevation, RaEdit-card': {
          overflow: 'visible',
        },
      }}
    >
      <SimpleForm>
        <TextInput
          source="title"
          name="title"
          format={(value) => value || ''}
          parse={(input) => (input === '' ? null : input)}
          fullWidth
        />
        <RichTextEditor source="body" />
      </SimpleForm>
    </Edit>
  )
}
