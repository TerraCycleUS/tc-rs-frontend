import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import SignIn from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('SignIn ', () => {
  test('it renders Sign-in page', async () => {
    render(
      <TestEnvironment store={store}>
        <SignIn />
      </TestEnvironment>,
    )
  })

  test('it renders reset password link', async () => {
    render(
      <TestEnvironment store={store}>
        <SignIn />
      </TestEnvironment>,
    )
    expect(screen.getByText('Forgotten password?')).toHaveProperty(
      'href',
      'http://localhost/reset-password',
    )
  })

  test('it renders register link', async () => {
    render(
      <TestEnvironment store={store}>
        <SignIn />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('registration')).toHaveProperty(
      'href',
      'http://localhost/registration',
    )
  })
})
