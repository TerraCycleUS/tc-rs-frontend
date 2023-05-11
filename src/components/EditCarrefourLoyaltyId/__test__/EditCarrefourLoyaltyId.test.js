import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import EditCarrefourLoyaltyId from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('EditCarrefourLoyaltyId ', () => {
  test('it renders EditCarrefourLoyaltyId page', async () => {
    render(
      <TestEnvironment store={store}>
        <EditCarrefourLoyaltyId />
      </TestEnvironment>,
    )
  })
})
