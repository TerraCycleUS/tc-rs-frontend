import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import ScanOrTypeCarrefour from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('ScanOrTypeCarrefour', () => {
  test('it renders ScanOrTypeCarrefour page', async () => {
    render(
      <TestEnvironment>
        <ScanOrTypeCarrefour />
      </TestEnvironment>,
    )
  })
})
