import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import RewardsWallet from '..'

describe('RewardsWallet ', () => {
  test('it renders RewardsWallet page', async () => {
    render(
      <TestEnvironment store={store}>
        <RewardsWallet />
      </TestEnvironment>,
    )
  })

  test('it renders link to add another retailer', async () => {
    render(
      <TestEnvironment store={store}>
        <RewardsWallet />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('add-retailer')).toHaveProperty(
      'href',
      'http://localhost/registration/select-retailer',
    )
  })
})
