import React from 'react'
import { Menu, useResourceDefinitions } from 'react-admin'
import SummarizeIcon from '@mui/icons-material/Summarize'

export default function CustomMenu() {
  const resources = useResourceDefinitions()
  return (
    <Menu>
      <Menu.DashboardItem />
      {Object.keys(resources).map((name) => (
        <Menu.ResourceItem key={name} name={name} />
      ))}
      <Menu.Item
        to="../reporting"
        primaryText="Reporting"
        leftIcon={<SummarizeIcon />}
      />
    </Menu>
  )
}
