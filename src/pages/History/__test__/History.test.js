import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import History from '..'

describe('History ', () => {
  test('it renders History page', async () => {
    render(
      <TestEnvironment store={store}>
        <History />
      </TestEnvironment>,
    )
    screen.debug()
  })
})
