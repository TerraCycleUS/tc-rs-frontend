import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import UnlockSuccessful from '../index'
import store from '../../../../store'
import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('UnlockSuccessful', () => {
  test('UnlockSuccessful will render with image for English translation not landing', async () => {
    render(
      <TestEnvironment store={store}>
        <UnlockSuccessful
          setShowPop={() => {}}
          setShowActive={() => {}}
          landing={false}
          navigate={() => {}}
          language="en"
        />
      </TestEnvironment>,
    )
  })

  test('UnlockSuccessful will render with image for English translation landing', async () => {
    render(
      <TestEnvironment store={store}>
        <UnlockSuccessful
          setShowPop={() => {}}
          setShowActive={() => {}}
          landing
          navigate={() => {}}
          language="en"
        />
      </TestEnvironment>,
    )
  })

  test('UnlockSuccessful will render with image for French translation landing', async () => {
    render(
      <TestEnvironment store={store}>
        <UnlockSuccessful
          setShowPop={() => {}}
          setShowActive={() => {}}
          landing
          navigate={() => {}}
          language="fr"
        />
      </TestEnvironment>,
    )
  })

  test('UnlockSuccessful will render with image for French translation not landing', async () => {
    render(
      <TestEnvironment store={store}>
        <UnlockSuccessful
          setShowPop={() => {}}
          setShowActive={() => {}}
          landing={false}
          navigate={() => {}}
          language="fr"
        />
      </TestEnvironment>,
    )
  })
})
