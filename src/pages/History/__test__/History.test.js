import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import History from '..'

describe('History ', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {})
  })

  test('it renders History page', async () => {
    render(
      <TestEnvironment store={store}>
        <History />
      </TestEnvironment>,
    )
  })
})
