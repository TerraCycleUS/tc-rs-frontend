import React from 'react'
import { render } from '@testing-library/react'
import TermsConditions from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('TermsConditions', () => {
  test('it renders TermsConditions page', async () => {
    render(
      <TestEnvironment store={store}>
        <TermsConditions />
      </TestEnvironment>,
    )
  })
})
