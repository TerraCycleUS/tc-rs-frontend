import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext } from 'react-admin'
import CustomMenu from '../index'
import '@testing-library/jest-dom'

describe('CustomMenu', () => {
  test('it renders CustomMenu component', async () => {
    render(
      <AdminContext>
        <CustomMenu />
      </AdminContext>,
    )
  })
})
