import React from 'react'
import { render } from '@testing-library/react'
import SocialLoginError from '../index'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('SocialLoginError', () => {
  test('it renders SocialLoginError', async () => {
    render(
      <TestEnvironment>
        <SocialLoginError type="fb" onClose={() => {}} />
      </TestEnvironment>,
    )
  })
})
