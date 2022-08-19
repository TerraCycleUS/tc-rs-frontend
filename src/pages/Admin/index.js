import React from 'react'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')
// console.log(dataProvider)
// list={userList} edit={editUser} create={createUser}
export default function AdminComponent() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" icon={Avatar} />
    </Admin>
  )
}
