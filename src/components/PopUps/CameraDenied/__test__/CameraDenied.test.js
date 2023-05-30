import React from 'react'
import { render } from '@testing-library/react'
import CameraDenied from '../index'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('CameraDenied', () => {
  test('it renders CameraDenied', async () => {
    render(
      <TestEnvironment>
        <CameraDenied setShowPop={() => {}} />
      </TestEnvironment>,
    )
  })
})
