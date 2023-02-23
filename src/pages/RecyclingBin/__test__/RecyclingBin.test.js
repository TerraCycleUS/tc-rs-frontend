import React from 'react'
import { act, render, screen } from '@testing-library/react'
import RecyclingBin from '../index'
import store from '../../../store'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import { setUser } from '../../../actions/user'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('Recycling bin', () => {
  afterEach(() => {
    act(() => {
      store.dispatch(setUser(null))
    })
  })

  test('it renders Recycling bin page', () => {
    render(
      <TestEnvironment store={store}>
        <RecyclingBin />
      </TestEnvironment>,
    )
  })

  test('it redirect to sign-in if user not logged in(no user in local storage)', async () => {
    render(
      <TestEnvironment store={store}>
        <RecyclingBin />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('addItem-link')).toHaveProperty(
      'href',
      'http://localhost/sign-in',
    )
  })

  test('it redirect to scan item if user is logged in', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <RecyclingBin />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('addItem-link')).toHaveProperty(
      'href',
      'http://localhost/scan-item',
    )
  })
})
