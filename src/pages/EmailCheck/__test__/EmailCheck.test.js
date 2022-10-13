import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import EmailCheck from '..'

describe('EmailCheck ', () => {
  test('it renders EmailCheck page', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailCheck />
      </TestEnvironment>,
    )
  })

  test('it has confirm code link(if it`s not reset password)', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailCheck />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('register-or-confirm')).toHaveProperty(
      'href',
      'http://localhost/registration/confirm-code',
    )
  })

  test('it has I mistyped my email link(if it`s not reset password)', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailCheck />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('signin-or-register')).toHaveProperty(
      'href',
      'http://localhost/registration',
    )
  })

  test('it has register link(it`s reset password case)', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailCheck forResetPw />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('register-or-confirm')).toHaveProperty(
      'href',
      'http://localhost/registration',
    )
  })

  test('it has sign-in link(it`s reset password case)', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailCheck forResetPw />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('signin-or-register')).toHaveProperty(
      'href',
      'http://localhost/sign-in',
    )
  })
})
