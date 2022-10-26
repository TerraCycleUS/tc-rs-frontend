import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import SaveItem from '..'
import { setUser } from '../../../actions/user'

describe('SaveItem ', () => {
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

  test('it renders SaveItem page', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <SaveItem />
      </TestEnvironment>,
    )
  })
})
