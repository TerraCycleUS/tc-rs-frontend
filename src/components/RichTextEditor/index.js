import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

export default function RichTextEditor({ source }) {
  const input = useController({ name: source })

  return (
    <CKEditor
      editor={ClassicEditor}
      data={input.field.value}
      onChange={(event, editor) => {
        const data = editor.getData()
        input.field.onChange(data)
      }}
    />
  )
}

RichTextEditor.propTypes = {
  source: PropTypes.string,
}
