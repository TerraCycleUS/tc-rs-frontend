import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import { Bubble, BubbleEnd, BubbleContainer } from '..'

describe('Bin', () => {
  test('it renders BubbleEnd', async () => {
    render(
      <TestEnvironment store={store}>
        <BubbleEnd />
      </TestEnvironment>,
    )
  })

  test('it renders Bubble', async () => {
    render(
      <TestEnvironment store={store}>
        <Bubble>text</Bubble>
      </TestEnvironment>,
    )
  })

  test('it renders BubbleContainer', async () => {
    render(
      <TestEnvironment store={store}>
        <BubbleContainer>text</BubbleContainer>
      </TestEnvironment>,
    )
  })
})
