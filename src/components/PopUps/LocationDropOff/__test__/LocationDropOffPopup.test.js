import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import LocationDropOffPopup from '../index'
import store from '../../../../store'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('LocationDropOffPopup', () => {
  test('LocationDropOffPopup will render', async () => {
    render(
      <TestEnvironment store={store}>
        <LocationDropOffPopup
          brand="Mock brand TM"
          location="Mock location"
          setShow={() => {}}
          onStart={() => {}}
        />
      </TestEnvironment>,
    )
  })
})
