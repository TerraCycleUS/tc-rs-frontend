import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import Language from '..'
import { setUser } from '../../../actions/user'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('Language ', () => {
  test('it renders Language page if user is signed-in', async () => {
    store.dispatch(setUser({ locale: 'en' }))
    render(
      <TestEnvironment store={store}>
        <Language />
      </TestEnvironment>,
    )
  })
})
