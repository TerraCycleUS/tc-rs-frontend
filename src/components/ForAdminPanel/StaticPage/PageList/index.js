import React from 'react'
import { Datagrid, List, TextField, RichTextField } from 'react-admin'

export default function PageList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <RichTextField source="body" />
      </Datagrid>
    </List>
  )
}
