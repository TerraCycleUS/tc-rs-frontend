import React from 'react'
import { Datagrid, List, TextField } from 'react-admin'

export default function PageList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
      </Datagrid>
    </List>
  )
}
