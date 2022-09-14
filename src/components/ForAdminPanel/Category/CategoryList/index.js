import React from 'react'
import { Datagrid, List, TextField } from 'react-admin'

export default function CategoryList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
      </Datagrid>
    </List>
  )
}
