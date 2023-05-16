import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import SwipingItem from '../index'
// import store from '../../../../store'
// import TestEnvironment from '../../../ForTestWriting/TestEnvironment'

describe('SwipingItem', () => {
  test('SwipingItem will render if provided with actionButtons prop', async () => {
    render(
      <SwipingItem
        actionButtons={[{ key: '5643rff', onClick: () => {}, role: 'button' }]}
      />,
    )
  })
})
