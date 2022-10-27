import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import Header from '..'

describe('Header', () => {
  test('it renders Header', async () => {
    render(
      <TestEnvironment store={store}>
        <Header />
      </TestEnvironment>,
    )
  })
})
