import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import CameraView from '..'

describe('CameraView', () => {
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

  test('it renders CameraView', async () => {
    render(
      <TestEnvironment store={store}>
        <CameraView />
      </TestEnvironment>,
    )
  })
})
