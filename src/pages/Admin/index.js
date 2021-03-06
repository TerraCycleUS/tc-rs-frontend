import React from 'react'
import { Admin } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

export default function AdminComponent() {
  return <Admin dataProvider={dataProvider} />
}
