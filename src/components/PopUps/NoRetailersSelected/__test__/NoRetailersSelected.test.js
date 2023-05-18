import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import NoRetailersSelected from '../index'
import store from '../../../../store'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('NoRetailersSelected', () => {
  test('NoRetailersSelected will render', async () => {
    render(
      <TestEnvironment store={store}>
        <NoRetailersSelected closePop={() => {}} openFilter={() => {}} />
      </TestEnvironment>,
    )
  })
})
