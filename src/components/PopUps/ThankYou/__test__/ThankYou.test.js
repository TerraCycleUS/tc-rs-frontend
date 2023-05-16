import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'
import store from '../../../../store'
import ThankYou from '../index'

jest.mock('../../../../utils/http', () => ({
  get: () => ({ data: { availableAmount: 999 } }),
}))
jest.mock('../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('ThankYou', () => {
  test('ThankYou will render', async () => {
    render(
      <TestEnvironment store={store}>
        <ThankYou amount={3} />
      </TestEnvironment>,
    )
  })

  test('ThankYou will render with zero amount', async () => {
    render(
      <TestEnvironment store={store}>
        <ThankYou amount={0} />
      </TestEnvironment>,
    )
  })
})
