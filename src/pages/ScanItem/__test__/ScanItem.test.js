import React from 'react'
import { act, render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import ScanItem from '..'
import { setUser } from '../../../actions/user'

describe('ScanItem ', () => {
  beforeEach(() => {
    const mockGetUserMedia = jest.fn(
      async () =>
        new Promise((resolve) => {
          resolve()
        }),
    )

    global.navigator.mediaDevices = {
      enumerateDevices: jest.fn(),
    }

    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia,
      },
    })
  })

  afterEach(() => {
    act(() => {
      store.dispatch(setUser(null))
    })
  })

  test('it renders ScanItem page', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <ScanItem />
      </TestEnvironment>,
    )
  })

  test('it has link to barcode scan', async () => {
    render(
      <TestEnvironment store={store}>
        <ScanItem />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('camera-scan')).toHaveProperty(
      'href',
      'http://localhost/camera-scan',
    )
  })

  test('it has link to barcode scan if user not registered', async () => {
    render(
      <TestEnvironment store={store}>
        <ScanItem />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('manual-setup')).toHaveProperty(
      'href',
      'http://localhost/registration',
    )
  })

  test('it has link to barcode scan if user is registered', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <ScanItem />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('manual-setup')).toHaveProperty(
      'href',
      'http://localhost/save-item',
    )
  })
})
