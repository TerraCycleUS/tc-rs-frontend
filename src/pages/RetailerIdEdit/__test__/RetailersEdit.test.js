import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import RetailersEdit from '..'

describe('RetailersEdit ', () => {
  test('it renders RetailersEdit page', async () => {
    render(
      <TestEnvironment store={store}>
        <RetailersEdit />
      </TestEnvironment>,
    )
  })
})
