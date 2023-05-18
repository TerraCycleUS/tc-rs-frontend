import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import DropOffPopup from '../index'
import store from '../../../../store'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('DropOffPopup', () => {
  test('DropOffPopup will render', async () => {
    render(
      <TestEnvironment store={store}>
        <DropOffPopup setShow={() => {}} onStart={() => {}} />
      </TestEnvironment>,
    )
  })
})
