import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import BrandList from '../index'
import '@testing-library/jest-dom'

describe('BrandList', () => {
  test('it renders BrandList component', async () => {
    render(
      <AdminContext resource="brand">
        <Resource name="brand" list={BrandList} />
      </AdminContext>,
    )
  })
})
