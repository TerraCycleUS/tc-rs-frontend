import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import CouponRequirement from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('CouponRequirement', () => {
  test('it renders CouponRequirement', async () => {
    render(
      <TestEnvironment store={store}>
        <CouponRequirement />
      </TestEnvironment>,
    )
  })
})
