import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import Button from '..'

describe('Button ', () => {
  test('it renders Button', async () => {
    render(
      <TestEnvironment store={store}>
        <Button />
      </TestEnvironment>,
    )
  })
})
