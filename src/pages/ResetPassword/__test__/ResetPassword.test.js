import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import ResetPassword from '..'

describe('ResetPassword ', () => {
  test('it renders Reset password page', async () => {
    render(
      <TestEnvironment store={store}>
        <ResetPassword />
      </TestEnvironment>,
    )
  })

  test('it renders sign-in link', async () => {
    render(
      <TestEnvironment store={store}>
        <ResetPassword />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('sign-in')).toHaveProperty(
      'href',
      'http://localhost/sign-in',
    )
  })
})
