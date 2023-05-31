import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MapPage from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

jest.mock('../../../utils/http', () => ({
  post: () => ({
    data: [{ id: 0, name: 'name', address: 'address', title: 'title' }],
  }),
}))
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))
jest.mock('../mapUtils', () => ({
  __esModule: true,
  default: () => true,
  init: () => ({ map: {}, lat: 43, lng: 7 }),
  getMarkerLogo: () => ({}),
  getNewMarkers: () => ({}),
}))

describe('MapPage', () => {
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

    expect(screen.getByTestId('user')).toBeInTheDocument()
    expect(screen.getByTestId('map')).toBeInTheDocument()
    expect(screen.getByTestId('footer-nav')).toBeInTheDocument()
    expect(screen.getByTestId('search')).toBeInTheDocument()
    expect(screen.getByTestId('centering-btn')).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('centering-btn'))
    screen.debug()
  })
})
