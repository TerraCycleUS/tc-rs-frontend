import React from 'react'
import { render } from '@testing-library/react'
import TermsConditions from '../index'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import store from '../../../store'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('TermsConditions', () => {
  test('it renders TermsConditions page', async () => {
    render(
      <TestEnvironment store={store}>
        <TermsConditions />
      </TestEnvironment>,
    )
  })
})
