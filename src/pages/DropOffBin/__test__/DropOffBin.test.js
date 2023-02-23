import React from 'react'
import { render } from '@testing-library/react'
import DropOffBin from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

describe('DropOffBin', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {})
  })

  test('it renders DropOffBin page', async () => {
    render(
      <TestEnvironment store={store}>
        <DropOffBin />
      </TestEnvironment>,
    )
  })
})
