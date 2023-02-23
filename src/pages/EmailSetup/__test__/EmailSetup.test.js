import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import EmailSetup from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('EmailSetup ', () => {
  test('it renders EmailSetup page', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailSetup />
      </TestEnvironment>,
    )
  })

  test('it has sign-in link', async () => {
    render(
      <TestEnvironment store={store}>
        <EmailSetup />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('sign-in')).toHaveProperty(
      'href',
      'http://localhost/sign-in',
    )
  })
})
