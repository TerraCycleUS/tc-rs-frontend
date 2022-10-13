import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import ConfirmationCode from '..'

describe('ConfirmationCode ', () => {
  test('it renders Confirmation code page', async () => {
    render(
      <TestEnvironment store={store}>
        <ConfirmationCode />
      </TestEnvironment>,
    )
  })
})
