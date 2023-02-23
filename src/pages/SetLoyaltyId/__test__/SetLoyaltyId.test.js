import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import SetLoyaltyId from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('SetLoyaltyId', () => {
  test('it renders SetLoyaltyId page', async () => {
    render(
      <TestEnvironment>
        <SetLoyaltyId />
      </TestEnvironment>,
    )
  })
})
