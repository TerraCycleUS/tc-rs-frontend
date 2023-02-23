import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import SetMonoprixLoyaltyId from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('SetMonoprixLoyaltyId ', () => {
  test('it renders RetailersId page', async () => {
    render(
      <TestEnvironment store={store}>
        <SetMonoprixLoyaltyId />
      </TestEnvironment>,
    )
  })

  test('it has skip for now ink', async () => {
    render(
      <TestEnvironment store={store}>
        <SetMonoprixLoyaltyId />
      </TestEnvironment>,
    )
    expect(screen.getByText('Skip for now')).toHaveProperty(
      'href',
      'http://localhost/',
    )
  })
})
