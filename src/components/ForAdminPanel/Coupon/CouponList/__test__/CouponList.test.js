import React from 'react'
import { render } from '@testing-library/react'
import { AdminContext, Resource } from 'react-admin'
import '@testing-library/jest-dom'
import CouponList from '../index'

jest.mock('../../../../../utils/http')
jest.mock('../../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('CouponList', () => {
  test('it renders CouponList component', async () => {
    render(
      <AdminContext>
        <Resource name="coupon" list={CouponList} />
      </AdminContext>,
    )
  })
})
