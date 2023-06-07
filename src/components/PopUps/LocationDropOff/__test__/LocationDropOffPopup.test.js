import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('LocationDropOffPopup cancel click', async () => {
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

    expect(screen.getByTestId('cancel')).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('cancel'))
  })
})
