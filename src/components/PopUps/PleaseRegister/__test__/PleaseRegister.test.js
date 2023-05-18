import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import PleaseRegister from '../index'
import store from '../../../../store'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('PleaseRegister', () => {
  test('PleaseRegister will render', async () => {
    render(
      <TestEnvironment store={store}>
        <PleaseRegister
          closePop={() => {}}
          unregisteredRetailer="Carrefour"
          user={{ name: 'Mock' }}
          currentRetailerId={1}
          onClick={() => {}}
          redirect="info"
        />
      </TestEnvironment>,
    )
  })

  test('PleaseRegister will render if user not registered', async () => {
    render(
      <TestEnvironment store={store}>
        <PleaseRegister
          closePop={() => {}}
          unregisteredRetailer="Carrefour"
          user={null}
          currentRetailerId={1}
          onClick={() => {}}
          redirect="info"
        />
      </TestEnvironment>,
    )
  })

  test('PleaseRegister will render if no redirect data', async () => {
    render(
      <TestEnvironment store={store}>
        <PleaseRegister
          closePop={() => {}}
          unregisteredRetailer="Carrefour"
          user={{ name: 'Mock' }}
          currentRetailerId={1}
          onClick={() => {}}
        />
      </TestEnvironment>,
    )
  })
})
