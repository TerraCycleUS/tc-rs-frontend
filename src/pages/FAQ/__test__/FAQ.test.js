import React from 'react'
import { render } from '@testing-library/react'
import FAQ from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('FAQ', () => {
  test('it renders FAQ page', async () => {
    render(
      <TestEnvironment store={store}>
        <FAQ />
      </TestEnvironment>,
    )
  })
})
