import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import '@testing-library/jest-dom'
import EditLoyaltyId from '..'

describe('EditLoyaltyId', () => {
  test('it renders EditLoyaltyId page', async () => {
    render(
      <TestEnvironment>
        <EditLoyaltyId />
      </TestEnvironment>,
    )
  })
})
