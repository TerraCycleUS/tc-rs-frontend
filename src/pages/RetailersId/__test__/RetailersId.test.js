import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import RetailersId from '..'

describe('RetailersId ', () => {
  test('it renders RetailersId page', async () => {
    render(
      <TestEnvironment store={store}>
        <RetailersId />
      </TestEnvironment>,
    )
  })

  test('it has skip for now ink', async () => {
    render(
      <TestEnvironment store={store}>
        <RetailersId />
      </TestEnvironment>,
    )
    expect(screen.getByText('Skip for now')).toHaveProperty(
      'href',
      'http://localhost/',
    )
  })
})
