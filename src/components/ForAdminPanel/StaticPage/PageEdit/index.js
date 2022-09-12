import React from 'react'
import { Edit, SimpleForm, TextInput, useNotify } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import useLanguageContext from '../../../../context/adminLang'

export default function PageEdit() {
  const notify = useNotify()
  const [lang] = useLanguageContext()
  const onError = (error) => {
    notify(`${error.body.errors}`)
  }

  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{ onError }}
      transform={(data) => ({
        title: data.title,
        body: data.body,
        langId: lang.value,
      })}
    >
      <SimpleForm>
        <TextInput
          source="title"
          name="title"
          format={(value) => value || ''}
          parse={(input) => (input === '' ? null : input)}
          fullWidth
        />
        <RichTextInput name="body" source="body" fullWidth />
      </SimpleForm>
    </Edit>
  )
}