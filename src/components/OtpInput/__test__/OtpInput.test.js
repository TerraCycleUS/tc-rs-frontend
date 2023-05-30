import React from 'react'
import { render } from '@testing-library/react'
import OtpInput from '../index'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'

describe('OtpInput', () => {
  test('it renders OtpInput', async () => {
    render(
      <TestEnvironment>
        <OtpInput />
      </TestEnvironment>,
    )
  })
})
