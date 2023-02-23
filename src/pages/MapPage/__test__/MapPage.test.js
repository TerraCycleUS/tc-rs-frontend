import React from 'react'
import { render } from '@testing-library/react'
import MapPage from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('MapPage', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {})
  })

  test('it renders MapPage', async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
      clearWatch: jest.fn(),
    }
    render(
      <TestEnvironment store={store}>
        <MapPage />
      </TestEnvironment>,
    )
  })
})
