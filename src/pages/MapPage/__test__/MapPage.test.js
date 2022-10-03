import React from 'react'
import { render } from '@testing-library/react'
import MapPage from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('MapPage', () => {
  test('it renders MapPage', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
      clearWatch: jest.fn(),
    }
    global.navigator.geolocation = mockGeolocation
    render(
      <TestEnvironment store={store}>
        <MapPage />
      </TestEnvironment>,
    )
  })
})
