import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import DropOffItems from '..'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('DropOffItems', () => {
  test('it renders DropOffItems', async () => {
    render(
      <TestEnvironment store={store}>
        <DropOffItems />
      </TestEnvironment>,
    )
  })
})
