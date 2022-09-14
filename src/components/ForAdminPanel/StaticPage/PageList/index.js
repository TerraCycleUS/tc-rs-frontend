import React from 'react'
import { Datagrid, List, TextField, RichTextField } from 'react-admin'

export default function PageList() {
  return (
    <List>
      <Datagrid
        sx={{
          '& span': {
            overflow: 'hidden',
            maxHeight: '200px',
            display: 'inline-block',
          },
        }}
        rowClick="edit"
      >
        <TextField source="id" />
        <TextField source="title" />
        <RichTextField source="body" />
      </Datagrid>
    </List>
  )
}
