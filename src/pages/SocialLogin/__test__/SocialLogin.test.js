import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import SocialLogin from '..'

describe('SocialLogin ', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {})
  })

  test('it renders SocialLogin page', async () => {
    render(
      <TestEnvironment store={store}>
        <SocialLogin />
      </TestEnvironment>,
    )
  })
})
