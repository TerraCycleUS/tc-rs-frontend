import React from 'react'
import { render } from '@testing-library/react'
import PrivacyPolicy from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('PrivacyPolicy', () => {
  test('it renders PrivacyPolicy page', async () => {
    render(
      <TestEnvironment store={store}>
        <PrivacyPolicy />
      </TestEnvironment>,
    )
  })
})
