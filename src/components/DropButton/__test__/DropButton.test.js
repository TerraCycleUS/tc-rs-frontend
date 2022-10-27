import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import DropButton from '..'

describe('DropButton', () => {
  test('it renders DropButton', async () => {
    render(
      <TestEnvironment store={store}>
        <DropButton />
      </TestEnvironment>,
    )
  })
})
